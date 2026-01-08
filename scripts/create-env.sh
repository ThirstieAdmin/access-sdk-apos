#!/usr/bin/env bash
set -euo pipefail

# create-env.sh
# Create an environment file from user input or CLI args.

usage(){
  cat <<EOF
Usage: $0 [options]

Options:
  -d, --domain          STOREFRONT_DOMAIN (required, e.g. fujiwhiskey)
  -a, --app             THAPPNAME (required, e.g. fuji_whiskey)
  -k, --apikey          THAPIKEY (required)
  -o, --out             output filename (default: .env.<brand>)
  -c, --create-admin    create admin user
      --admin-file      path to admin env file to read (default: .env-admin)
  -f, --force           overwrite existing file without prompting
  -n, --non-interactive do not prompt; error on missing required values
  -h, --help            show this help

Examples:
  $0 --create-admin --domain=fujiwhiskey --app=fuji_whiskey --apikey=ABC123
  $0   (interactive)
EOF
}

gen_secret_node(){
  if command -v node >/dev/null 2>&1 && [ -f "$(dirname "$0")/gen_secret.js" ]; then
    node "$(dirname "$0")/gen_secret.js"
    return $?
  fi
  return 1
}

confirm(){
  if [ "${FORCE:-false}" = true ] ; then
    return 0
  fi
  read -r -p "$1 [y/N]: " ans
  case "$ans" in
    [yY]|[yY][eE][sS]) return 0;;
    *) return 1;;
  esac
}

brand=""
app=""
apikey=""
outfile=""
create_admin=false
admin_file=".env-admin"
FORCE=false
NONINTERACTIVE=false

while [ "$#" -gt 0 ]; do
  case "$1" in
    -b|--domain) brand="$2"; shift 2;;
    --domain=*) brand="${1#*=}"; shift;;
    -a|--app) app="$2"; shift 2;;
    --app=*) app="${1#*=}"; shift;;
    -k|--apikey) apikey="$2"; shift 2;;
    --apikey=*) apikey="${1#*=}"; shift;;
    -o|--out) outfile="$2"; shift 2;;
    --out=*) outfile="${1#*=}"; shift;;
    --create-admin) create_admin=true; shift;;
    --create-admin=*) create_admin="${1#*=}"; shift;;
    --admin-file) admin_file="$2"; shift 2;;
    --admin-file=*) admin_file="${1#*=}"; shift;;
    -f|--force) FORCE=true; shift;;
    -n|--non-interactive) NONINTERACTIVE=true; shift;;
    -h|--help) usage; exit 0;;
    *) echo "Unknown arg: $1"; usage; exit 2;;
  esac
done

# Interactive prompts
if [ -z "$brand" ]; then
  if [ "$NONINTERACTIVE" = true ]; then
    echo "STOREFRONT_DOMAIN is required" >&2; exit 2
  fi
  read -r -p "STOREFRONT_DOMAIN (e.g. fujiwhiskey): " brand
fi

if [ -z "$app" ]; then
  if [ "$NONINTERACTIVE" = true ]; then
    echo "THAPPNAME is required" >&2; exit 2
  fi
  read -r -p "THAPPNAME (slug, e.g. fuji_whiskey): " app
fi

if [ -z "$apikey" ]; then
  if [ "$NONINTERACTIVE" = true ]; then
    echo "THAPIKEY is required" >&2; exit 2
  fi
  read -r -p "THAPIKEY: " apikey
fi

if [ -z "$outfile" ]; then
  outfile=".env.$brand"
fi

# Validate brand and app
if ! printf '%s' "$brand" | grep -Eq '^[a-z0-9-]+$' ; then
  echo "STOREFRONT_DOMAIN must match ^[a-z0-9-]+$" >&2; exit 2
fi
if ! printf '%s' "$app" | grep -Eq '^[a-z0-9_-]+$' ; then
  echo "THAPPNAME must match ^[a-z0-9_-]+$" >&2; exit 2
fi

if [ -e "$outfile" ] && [ "$FORCE" = false ]; then
  if ! confirm "File $outfile exists. Overwrite?"; then
    echo "Aborted."; exit 1
  fi
fi

# Generate THEXPRESS_SECRET (always use scripts/gen_secret.js)
thexpress_secret=""
if ! thexpress_secret=$(gen_secret_node); then
  echo "Unable to generate THEXPRESS_SECRET: ensure 'node' is available and scripts/gen_secret.js exists" >&2
  exit 3
fi

echo ""
echo "THEXPRESS_SECRET created $thexpress_secret"
echo ""

# Create file content based on the template env.tpl
tpl="$(dirname "$0")/../env.tplxxx"
tmpfile="$(mktemp)"
chmod 600 "$tmpfile"

cat > "$tmpfile" <<EOF
THAPPNAME=$app
THBASEURL=${THBASEURL:-http://localhost:3000}
THENV=${THENV:-sandbox}
THAPIKEY=$apikey
THMAPSKEY=${THMAPSKEY:-}
THEXPRESS_SECRET=${thexpress_secret:-}
APOS_MONGODB_URI=mongodb+srv://${APOS_MONGODB_USER}:${APOS_MONGODB_SECRET}@thirstieaccessdev.uc73kq1.mongodb.net/${app}?appName=${APOS_MONGODB_CLUSTER}&retryWrites=true&w=majority
APOS_S3_BUCKET=${APOS_S3_BUCKET:-}
APOS_S3_REGION=${APOS_S3_REGION:-}
APOS_S3_KEY=${APOS_S3_KEY:-}
APOS_S3_SECRET=${APOS_S3_SECRET:-}
EOF

mv "$tmpfile" "$outfile"
chmod 600 "$outfile"

echo "Wrote $outfile (mode 600)."
echo "DO NOT commit this file. Add to .gitignore if needed."
echo
echo "Next step (create admin user):"
echo "npx dotenv -e $outfile -- node app @apostrophecms/user:add thirstieadmin admin"

if [ "$create_admin" = true ]; then
  # do not parse the admin file here; assume it was sourced earlier (or env vars provided)
  APOS_ADMIN=${APOS_ADMIN:-thirstieadmin}
  APOS_ADMIN_SECRET=${APOS_ADMIN_SECRET:-}

  if [ -z "$APOS_ADMIN_SECRET" ]; then
    echo "APOS_ADMIN_SECRET is not set in the environment; cannot create admin user." >&2
    exit 5
  fi

  echo "Creating admin user '$APOS_ADMIN' using environment variables (admin file: $admin_file) (will not echo password)..."
  echo ">>> $APOS_ADMIN_SECRET "

  # Provide password. Use printf to supply newline-terminated inputs.
  if printf '%s\n%s\n' "$APOS_ADMIN_SECRET" | npx dotenv -e "$outfile" -- node app @apostrophecms/user:add "$APOS_ADMIN" admin; then
    echo "Admin user $APOS_ADMIN created (or already exists)."
  else
    echo "Failed to create admin user. You can run:" >&2
    echo "  npx dotenv -e $outfile -- node app @apostrophecms/user:add $APOS_ADMIN admin" >&2
    exit 6
  fi
fi

echo ""
echo "Setup complete"
echo "npx dotenv -e $outfile -- nodemon"
echo ""

# TODO: password is not set correctly
