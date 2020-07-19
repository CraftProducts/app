import PptxGenJS from "pptxgenjs";

// this.options = {
//     appTitle: environment.appTitle,
//     filename: this.filename || this.model.code,
//     theme: 'default',
//     includeMainSlide: true,
//     mainSlide: {
//         title: this.model.title,
//         summary: this.model.summary,
//         author: environment.appTitle
//     },
//     includePaging: true,
//     includeNotes: true
// };

export function createPptx(model, options) {
    let pptx = generatePptx(options);
    console.log('createPptx', model);

    if (options.includeMainSlide) {
        let mainSlide = pptx.addSlide();
        mainSlide.bkgd = "31A6FD";
        mainSlide.color = "ffffff";
        mainSlide
            .addImage({ x: ".1", y: ".1", w: ".4", h: ".4", path: "./assets/logo.png" })
            .addText(`Created using ${options.appTitle}`, { x: "0", y: "96%", w: "100%", align: "right", color: "333333", fontSize: 12 })

            .addText(options.mainSlide.title, { x: "10%", y: "40%", w: "80%", fontSize: 60 })
            .addText(options.mainSlide.summary, { x: "10%", y: "47%", w: "80%", fontSize: 24, valign: "top" })
            .addText(options.mainSlide.author, { x: "10%", y: "65%", w: "80%", fontSize: 18 })
            .addText(new Date().toDateString(), { x: "10%", y: "70%", w: "80%", fontSize: 18 })
    }

    // defineSlideMaster(pptx, options);
    // let slide = pptx.addSlide("PRODUCTPURPOSE_SLIDE");
    // slide.addText("How To Create PowerPoint Presentations with JavaScript", { x: 0.5, y: 0.7, fontSize: 18 });
    // slide.addText("hello filled value in body placeholder here!", { placeholder: "body" });

    pptx.writeFile(`${options.filename}.pptx`);
}

function defineSlideMaster(pptx: PptxGenJS, options) {

    pptx.defineSlideMaster({
        title: "PRODUCTPURPOSE_SLIDE",
        bkgd: "FFFFFF",
        objects: [
            { rect: { x: 0, y: 0, w: "100%", h: 0.75, fill: "F1F1F1" } },
            { text: { text: "Status Report", options: { x: 0, y: 0, w: 6, h: 0.75 } } },
            {
                placeholder: {
                    options: { name: "body", type: "body" as PptxGenJS.PLACEHOLDER_TYPES, x: 0.6, y: 1.5, w: 12, h: 5.25 },
                    text: "(custom placeholder text!)",
                },
            },
        ],
        slideNumber: options.includePaging ? { x: 0.3, y: "90%" } : null
    });
}

function generatePptx(options: any) {
    let pptx = new PptxGenJS();
    pptx.author = options.mainSlide.author;
    pptx.subject = options.mainSlide.title;
    pptx.title = options.mainSlide.title;

    pptx.layout = "LAYOUT_WIDE";
    return pptx;
}
