#!/opt/homebrew/bin/bash

# Usage example :
##  ./myworkmaterial/package_project_4qwen.sh ./package.json ./{app,assets}/*.{ts,tsx,json} "./app/(tabs)/*" ./*.{js,ts,tsx}
##  ./myworkmaterial/package_project_4qwen.sh ./package.json tsconfig.json ./*.{js,ts,tsx} ./src{/**,}/*.{ts,tsx,json}

# Output file
OUTPUT="project_export.txt"
> "$OUTPUT"  # Clear output file

# Function to check if file is text (include JSON/XML/etc)
is_text_file() {
  local file="$1"
  file "$file" | grep -Eq 'ASCII|UTF-8|text|JSON|XML|CSV|script|source'
}

# Function to process a single file
process_file() {
  local file="$1"
  echo "🏎️ processing : $file"
  echo "### FILE: $file ###" >> "$OUTPUT"
  cat "$file" >> "$OUTPUT"
  echo -e "\n\n---\n\n" >> "$OUTPUT"
}

# Display tree of the project layout
echo "## Project Layout" >> "$OUTPUT"
echo "### COMMAND: tree -L 1" >> "$OUTPUT"
tree -L 1 ./ >> "$OUTPUT"
echo
echo "## end of project Layout".

# Escape special characters in paths before eval
escape_glob() {
  local path="$1"
  echo "${path//(/\\(}" | "${path//)/\\)}"
}

files=()

# Loop through all arguments
for arg in "$@"; do
  # Remove quotes temporarily to detect glob patterns
  tmp_arg="${arg//\"/}"
  tmp_arg="${tmp_arg//\'/}"

  # Check if argument contains wildcard chars (* or ?)
  if [[ "$tmp_arg" == *"*"* || "$tmp_arg" == *"?"* ]]; then
    # Escape parentheses to avoid syntax errors in eval
    safe_arg="${arg//(/\\(}"
    safe_arg="${safe_arg//)/\\)}"

    # Expand safely using escaped path
    shopt -s nullglob
    eval "matches=($safe_arg)"
    files+=("${matches[@]}")
  else
    # Not a glob — treat as literal file/path
    files+=("$arg")
  fi
done

# Remove duplicates
readarray -t unique_files < <(printf "%s\n" "${files[@]}" | awk '!seen[$0]++')

# Process each unique file
for file in "${unique_files[@]}"; do
  if [ -f "$file" ]; then
    if is_text_file "$file"; then
      process_file "$file"
    else
      echo "Skipping binary file: $file"
    fi
  elif [ -d "$file" ]; then
    echo "⚠️ Warning: '$file' is a directory. Use /* to include contents."
  else
    echo "⚠️ Not found: $file"
  fi
done

echo "✅ Project exported to: $OUTPUT"

