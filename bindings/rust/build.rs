use std::path::PathBuf;

fn main() {
    let src_dir = PathBuf::from("src");

    let mut c_config = cc::Build::new();
    c_config.include(&src_dir);
    c_config.file(src_dir.join("parser.c"));
    c_config.compile("tree-sitter-kee");

    println!("cargo:rerun-if-changed=src/parser.c");
}
