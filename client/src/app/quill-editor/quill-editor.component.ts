import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
declare var require: any;
const Quill = require('quill');

@Component({
  selector: 'quill-editor',
  template: `<div class="quill-editor"></div>`,
  styleUrls: [
    './quill-editor.component.css',
    './quill.core.css',
    './quill.snow.css',
    './quill.bubble.css'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QuillEditorComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class QuillEditorComponent implements AfterViewInit, ControlValueAccessor, OnChanges {

  // 基本数据
  quillEditor: any;
  editorElem: HTMLElement;
  content: any;
  defaultModules = {
    // formula:true,
    // syntax:true,
    toolbar: [
      [ 'bold','italic', 'underline', 'strike',{ 'script': 'sub'}, { 'script': 'super' },'blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' },{ 'indent': '-1'}, { 'indent': '+1' },{ 'align': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] },{ 'color': [] }, { 'background': [] },'clean'],
      [{ 'header': 1}, { 'header': 2 },{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image']
    ]
  };

  // 传入配置
  @Input() options: Object;

  // 派发事件
  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() ready: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();

  // ...
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  // 注入Dom
  constructor(private elementRef: ElementRef) { }

  // 视图加载完成后执行初始化
  ngAfterViewInit() {
    this.editorElem = this.elementRef.nativeElement.children[0];

    this.quillEditor = new Quill(this.editorElem, Object.assign({
      modules: this.defaultModules,
      placeholder: '简单的编辑，不一样的想法......',
      readOnly: false,
      theme: 'snow',
      boundary: document.body
    }, this.options || {}));

    // 写入内容
    if (this.content) {
      this.quillEditor.pasteHTML(this.content);
    }

    // 广播事件
    this.ready.emit(this.quillEditor);

    // mark model as touched if editor lost focus
    this.quillEditor.on('selection-change', (range) => {
      if (!range) {
        this.onModelTouched();
        this.blur.emit(this.quillEditor);
      } else {
        this.focus.emit(this.quillEditor);
      }
    });

    // update model if text changes
    this.quillEditor.on('text-change', (delta, oldDelta, source) => {
      let html = this.editorElem.children[0].innerHTML;
      const text = this.quillEditor.getText();

      if (html === '<p><br></p>') html = null;

      this.onModelChange(html);

      this.change.emit({
        editor: this.quillEditor,
        html: html,
        text: text
      });
    });
  }

  // 数据变更时
  ngOnChanges(changes: SimpleChanges) {
    if (changes['readOnly'] && this.quillEditor) {
      this.quillEditor.enable(!changes['readOnly'].currentValue);
    }
  }

  // 写数据
  writeValue(currentValue: any) {
    this.content = currentValue;

    if (this.quillEditor) {
      if (currentValue) {
        this.quillEditor.pasteHTML(currentValue);
        return;
      }
      this.quillEditor.setText('');
    }
  }

  // 注册事件
  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  // 注册事件
  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
}
