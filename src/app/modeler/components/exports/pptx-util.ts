import PptxGenJS from "pptxgenjs";
import { extractSections } from '../../modeler-utils';
import * as _ from 'lodash';

export function createPptx(model, options) {
    let pptx = generatePptx(options);

    if (options.includeMainSlide) {
        createMainSlide(pptx, options);
    }

    const sections = [];
    extractSections(model, ['title', 'summary', 'code', 'data', 'datatype'], sections);
    console.log('sections', sections);
    defineSeparatorSlideMaster(pptx, options);
    defineTextSlideMaster(pptx, options);

    if (sections && sections.length > 0) {
        sections.forEach(section => {
            const sectionSlide = pptx.addSlide("SEPARATOR_SLIDE");
            sectionSlide.addText(section.title, { placeholder: "body", align: "center", valign: "middle", fontSize: 80 });
            if (section.data && section.datatype) {
                const datatype = section.datatype.toLowerCase();
                if (datatype === 'text' || datatype === 'list') {

                    const dataSlide = createDataSlide(section);
                    let noteText = '';

                    switch (datatype) {
                        case 'text':
                            if ((section.data.text && section.data.text.length > 0) || options.includeEmptySections) {
                                dataSlide.addText(section.data.text, { placeholder: "body" });

                                noteText = prepareNoteText(section.data, options.includeNotes);
                            }
                            break;
                        case 'list':
                            if ((section.data.list && section.data.list.length > 0) || options.includeEmptySections) {
                                const list = _.map(section.data.list || [], record => {
                                    let recordNoteText = prepareNoteText(record, options.includeNotes);
                                    if (recordNoteText && recordNoteText.length > 0) {
                                        recordNoteText = record.title + '\n' + recordNoteText;
                                        noteText = noteText + recordNoteText;
                                    }
                                    return {
                                        text: record.title,
                                        options: { fontSize: 24, breakLine: true, bullet: true }
                                    }
                                });
                                dataSlide.addText(list, { placeholder: "body" });
                            }
                            break;
                        case 'matrix':
                            break;
                    }
                    if (noteText && noteText.length > 0) {
                        dataSlide.addNotes(noteText);
                    }
                }

            }
        });
    }

    pptx.writeFile(`${options.filename}.pptx`);

    function createDataSlide(section: any) {
        const listSlide = pptx.addSlide("TEXT_SLIDE");
        listSlide.addText(section.title, { placeholder: "title", align: "left", color: "FFFFFF", fontSize: 44 });
        return listSlide;
    }
    function prepareNoteText(record: any, includeNotes: boolean = false) {
        let noteText = record.summary && record.summary.length > 0
            ? record.summary + '\n\n'
            : '';

        if (includeNotes && record.notes && record.notes.length > 0) {
            const notelist = _.map(record.notes,
                note => `${new Date(note.timestamp).toDateString()}: \n${note.note}`);
            noteText = noteText + _.join(notelist, '\n');
        }

        return noteText;
    }
}

function createMainSlide(pptx: PptxGenJS, options: any) {
    let mainSlide = pptx.addSlide();
    mainSlide.bkgd = "31A6FD";
    mainSlide.color = "ffffff";
    mainSlide
        .addImage({ x: ".1", y: ".1", w: ".4", h: ".4", path: "./assets/logo.png" })
        .addText(`Created using ${options.appTitle}`, { x: "0", y: "96%", w: "100%", align: "right", color: "333333", fontSize: 12 })

        .addText(options.mainSlide.title, { x: "10%", y: "40%", w: "80%", fontSize: 60, wrap: false })
        .addText(options.mainSlide.summary, { x: "10%", y: "47%", w: "80%", fontSize: 24, valign: "top" })
        .addText(options.mainSlide.author, { x: "10%", y: "65%", w: "80%", fontSize: 18 })
        .addText(new Date().toDateString(), { x: "10%", y: "70%", w: "80%", fontSize: 18 });
}

function defineSeparatorSlideMaster(pptx: PptxGenJS, options) {
    pptx.defineSlideMaster({
        title: "SEPARATOR_SLIDE",
        bkgd: "f1f1f1",
        objects: [
            {
                placeholder: {
                    options: { name: "body", type: "body" as PptxGenJS.PLACEHOLDER_TYPES, x: 0.5, y: 1, w: 12, h: 5.25 },
                    text: "<section title>",
                },
            },
        ],
        slideNumber: options.includePaging ? { x: 0.3, y: "90%" } : null
    });
}

function defineTextSlideMaster(pptx: PptxGenJS, options) {
    pptx.defineSlideMaster({
        title: "TEXT_SLIDE",
        objects: [
            { rect: { x: 0, y: 0, w: "100%", h: 1, fill: "31A6FD" } },
            {
                placeholder: {
                    options: { name: "title", type: "title" as PptxGenJS.PLACEHOLDER_TYPES, x: 0.5, y: 0, w: 12, h: 1 },
                    text: "<section title>",
                },
            },
            {
                placeholder: {
                    options: { name: "body", type: "body" as PptxGenJS.PLACEHOLDER_TYPES, x: 0.5, y: 1.25, w: 12, h: 5.25 },
                    text: "<text>",
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
