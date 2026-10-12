# Image sources and review requirements

This branch contains **60 source-labeled candidate images**: 30 camera photographs and 30 synthetic images, in portrait, animal and scene categories. No authenticity is inferred from image appearance; labels are based on the supplying dataset or photographer source.

## Original sources

| Category | Images | Origin | Source and license claims |
|---|---:|---|---|
| REAL portraits | 10 | metetet/thesis faces `test/0` | [Original subset & MIT notice](https://github.com/metetet/thesis/blob/main/archive/datasets/faces_512x512/LICENSE_dataset.txt) |
| AI portraits | 10 | metetet/thesis faces `test/1` | Same MIT-labeled subset and attribution |
| REAL dogs | 10 | metetet/thesis dogs `test/0` | [Dataset claims CC0](https://github.com/metetet/thesis/blob/main/archive/datasets/dogs/LICENSE_dataset.txt) |
| AI dogs | 10 | metetet/thesis dogs `test/1` | Same CC0-labeled subset |
| REAL scenes | 10 | Unsplash original image URLs | [Unsplash License](https://unsplash.com/license), confirm each photo credit |
| AI scenes | 10 | PocketNugget/Coherence-assessment-of-generated-realistic-images | [Dataset claims MIT](https://github.com/PocketNugget/Coherence-assessment-of-generated-realistic-images) |

### Attribution

**MIT dataset notices:** Faces subset attributes Mark Otto (2013), Andrew Fong (2017), and its maintainers. The full MIT license notice must accompany copied assets. The PocketNugget dataset is credited to Goben Diego Constantino Aguirre and collaborators; its repository README represents the image dataset as MIT-licensed. Preserve repository copyright and license notices when self-hosting. Metetet datasets are repackaged versions of other work; confirm upstream attribution and photo usage independently.

**Real scene attribution:** Unsplash author names were initially obtained from a third-party curated index and **not independently verified**. Confirm photographer and link back to the specific original photo page before using in production.

## Before publishing or advertising

- Visually inspect every image for correct label, subject, objectionable content, duplicated people or obvious glitches, and identify a balanced hard subset (blind human testing recommended).
- Independently confirm each upstream license/photographer credit, including model-generated and third-party images. Being downloadable on GitHub does *not* guarantee free commercial use.
- Download and self-host optimized images; remove remote GitHub and Unsplash hotlinks and validate actual HTTP delivery on web/mobile.
- Use consistent image rendering/compression so file quality doesn't trivially reveal the class.
- When replacing any image **bump CATALOG_VERSION** and preserve a frozen version of the old catalog if published challenge links exist.
- Run mobile/browser E2E checks as well as lint/typecheck/unit/build.

**Current status:** candidate set ready for prototype testing, **not an independently licensed or difficulty-verified launch collection**.
