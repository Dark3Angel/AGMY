// @ts-ignore
import Header from 'editorjs-header-with-alignment';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Paragraph from 'editorjs-paragraph-with-alignment';
// @ts-ignore
import Underline from '@editorjs/underline';
// @ts-ignore
import ColorPlugin from 'editorjs-text-color-plugin';

  export var  AboutEditorConfig = {
        holder: 'editor-about',
            tools: { 
              header: {
                class: Header,
                inlineToolbar: ['link']
              },
              underline: Underline,
              paragraph: {
                config: {
                  placeholder: 'Развернутое описание курса. Все что пользователям нужно знать о курсе перед его покупкой.'
                },
                class: Paragraph,
                inlineToolbar: true,
              },
              Color: {
                class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
                config: {
                   colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
                   defaultColor: '#FF1300',
                   type: 'text', 
                   customPicker: true // add a button to allow selecting any colour  
                }     
              },
              list: {
                class: List,
                inlineToolbar: ['link', 'bold']
              },
              marker: {
                class: ColorPlugin,
                shortcut: 'CMD+SHIFT+M',
                config: {
                  defaultColor: '#FFBF00',
                  type: 'marker',
                  icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
                 }
              },
            },
             //////// ПЕРЕВВОД НА РУССКИЙ/////////////////
             i18n: {
              /**
               * @type {I18nDictionary}
               */
              messages: {
                /**
                 * Other below: translation of different UI components of the editor.js core
                 */
                ui: {
                  "blockTunes": {
                    "toggler": {
                      "Click to tune": "Нажмите, чтобы настроить",
                      "or drag to move": "или перетащите",
                    },
                  },
                  "inlineToolbar": {
                    "converter": {
                      "Convert to": "Конвертировать в"
                    }
                  },
                  "toolbar": {
                    "toolbox": {
                      "Add": "Добавить"
                    }
                  }
                },
            
                /**
                 * Section for translation Tool Names: both block and inline tools
                 */
                toolNames: {
                  "Text": "Параграф",
                  "Heading": "Заголовок",
                  "List": "Список",
                  "Warning": "Примечание",
                  "Checklist": "Чеклист",
                  "Quote": "Цитата",
                  "Code": "Код",
                  "Delimiter": "Разделитель",
                  "Raw HTML": "HTML-фрагмент",
                  "Table": "Таблица",
                  "Link": "Ссылка",
                  "Marker": "Выделение",
                  "Bold": "Полужирный",
                  "Italic": "Курсив",
                  "InlineCode": "Моноширинный",
                  "Underline": "Нижнее подчеркивание",
                  "Color":"Цвет",
                },
            
                /**
                 * Section for passing translations to the external tools classes
                 */
                tools: {
                  /**
                   * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
                   * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
                   */
                  "warning": { // <-- 'Warning' tool will accept this dictionary section
                    "Title": "Название",
                    "Message": "Сообщение",
                  },
            
                  /**
                   * Link is the internal Inline Tool
                   */
                  "link": {
                    "Add a link": "Вставьте ссылку"
                  },
                  /**
                   * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
                   */
                  "stub": {
                    'The block can not be displayed correctly.': 'Блок не может быть отображен'
                  },
                  "list": {
                    "Ordered": "Нумерованный",
                    "Unordered": "Маркированный"
                  },
                  "table": {
                    "With headings": "С заголовками",
                    "Without headings": "Без заголовков",
                    "Add column to left":"Добавить столбец слева",
                    "Add column to right":"Добавить столбец справа",
                    "Delete column":"Удалить столбец",
                    "Add row below":"Добавить строку ниже",
                    "Add row above":"Добавить строку выше",
                    "Delete row":"Удалить строку",
                    "Heading":"Заголовок",
                  },
                },
            
                /**
                 * Section allows to translate Block Tunes
                 */
                blockTunes: {
                  /**
                   * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
                   * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
                   *
                   * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
                   */
                  
                  "delete": {
                    "Delete": "Удалить"
                  },
                  "moveUp": {
                    "Move up": "Переместить вверх"
                  },
                  "moveDown": {
                    "Move down": "Переместить вниз"
                  },
                },
              }
            },
      }