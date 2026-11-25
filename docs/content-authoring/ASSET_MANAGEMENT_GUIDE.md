# Asset Management Guide

This guide documents asset support already present in the content types. It does not add image processing, galleries, asset imports, or a document model.

## Supported asset fields

- Profile photo: `Profile.image: ImageAsset`.
- Project cover: `Project.coverImage: ImageAsset`.
- Project gallery metadata: `Project.gallery: readonly ImageAsset[]`. The model and validator support it, but the current homepage does not render gallery items.
- Research image: not supported. `ResearchItem` has no image field; add one only through a separately reviewed model change.
- CV/resume destination: `Profile.resumeLink: ExternalLink` with a verified absolute HTTP(S) `href`. A `kind: 'download'` link is available, but there is no local-document or file-upload type.
- Other download links: project/research `ExternalLink` supports `kind: 'download'`, with an absolute HTTP(S) destination.

## Recommended directory layout

For local static files, place them under Vite's `public/` directory so model paths can use the root-relative URL accepted by the validator:

```text
public/
  assets/
    profile/
      portrait.webp
    projects/
      <project-slug>/
        cover.webp
        diagram-01.png
    documents/
      <owner-approved-document-name>.pdf
```

The tree is a recommendation only; no asset folders or files are created by this phase. The local URL for `public/assets/projects/<slug>/cover.webp` is `/assets/projects/<slug>/cover.webp`. Absolute HTTP(S) asset URLs are also accepted. Do not use protocol-relative URLs (`//host/path`), backslashes, or spaces in paths. The validator cannot confirm that a referenced file exists.

`resumeLink.href` and `ExternalLink.href` are currently required to be absolute HTTP(S). A local `/assets/documents/...` CV URL will fail link validation. Host a CV at a verified HTTPS URL for now. Supporting a bundled root-relative CV/download path would be a deliberate validator contract enhancement.

## Naming and formats

- Use lowercase kebab-case file names and stable, descriptive terms such as `cover.webp` or `architecture-overview.png`; avoid spaces, personal data in filenames, and repeated names that collide across project folders.
- Prefer WebP or JPEG for photographs, PNG for transparency or crisp raster diagrams, and AVIF where the target hosting/browser support has been verified. These are recommendations; the model does not constrain extensions or inspect MIME types.
- Keep the original source file outside the public output if it is large or sensitive. Publish only the optimized derivative intended for visitors.
- Use `width` and `height` as positive integer source dimensions when known. They are optional and are not intrinsic crop instructions.

## Ratios and display behavior

- Profile images are displayed in an approximately 4:5 crop on the homepage; choose a source that remains legible when cropped vertically.
- Project `coverImage` is displayed in a 16:9 frame using `object-fit: cover`; keep important details away from edges.
- `gallery` has no current homepage presentation. Adding gallery images to data does not make them visible until an approved UI phase renders them.
- Images are optional. Do not create or use stock imagery to fill empty content.

## Alt text

Every `ImageAsset` requires a non-empty `alt`. Describe relevant visible information in context, not the file name. For a profile portrait, a concise identification is appropriate if the owner wants the image and confirms it. For a project diagram, describe the key relationship shown. Do not repeat surrounding captions word-for-word. If an image is purely decorative, the current model/validator still requires non-empty alt text; changing that behavior would need an explicit model and validator decision.

## Add, replace, and remove safely

1. Confirm the owner has rights to publish the asset and that it contains no private data, credentials, or unrelated people who have not approved publication.
2. Add the optimized file at its stable path and record that path and accurate alt text in the typed content record.
3. Run `npm run validate:content`, `npm run test:content`, `npm run typecheck`, and `npm run build`.
4. Verify the path resolves in the built/deployed site; validation checks path shape, not existence.
5. To replace an asset, either keep the same path and replace its bytes, or update every record reference before removing the old file. Search the repository for the old path first.
6. Remove an asset only after all references are gone. Re-run validation and build so broken paths are caught by manual rendered verification.

Do not add actual personal images or CV files until the owner provides and approves them.
