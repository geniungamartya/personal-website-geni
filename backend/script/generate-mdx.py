import json
from pathlib import Path

import frontmatter
import typer

app = typer.Typer()


@app.command()
def mdx_to_json(input_dir: str, output_file: str):
    """
    Load multiple MDX files from input_dir, extract front matter (title, date, content),
    and save as a JSON file.
    """
    input_path = Path(input_dir)
    if not input_path.exists() or not input_path.is_dir():
        typer.echo(f"❌ Error: {input_dir} is not a valid directory.")
        raise typer.Exit(code=1)

    mdx_data = []

    # Read all .mdx files in the directory
    for mdx_file in input_path.glob("*.mdx"):
        post = frontmatter.load(mdx_file)

        # Extract front matter and content
        mdx_data.append(
            {
                "title": post.get("title", "Untitled"),
                "date": post.get("date", "Unknown"),
                "content": post.content,
            }
        )

    # Write to JSON
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(mdx_data, f, indent=4, ensure_ascii=False)

    typer.echo(f"✅ Successfully saved {len(mdx_data)} posts to {output_file}")


if __name__ == "__main__":
    app()
