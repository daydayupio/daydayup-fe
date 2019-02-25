<template>
  <div class="editor">
    <editor-menu-bar v-if="enableEditorMenuBar" :editor="editor" class="editor-menu">
      <div slot-scope="{ commands, isActive }">
        <button class="button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
          <Icon type="i iconfont icon-bold"></Icon>
        </button>
        <button class="button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
          <Icon type="i iconfont icon-italic"></Icon>
        </button>
        <button class="button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
          <Icon type="i iconfont icon-strike"></Icon>
        </button>
        <button
          class="button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <Icon type="i iconfont icon-underline"></Icon>
        </button>
        <button class="button" :class="{ 'is-active': isActive.code() }" @click="commands.code">
          <Icon type="i iconfont icon-code"></Icon>
        </button>
        <!-- <button 
            class="button" 
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
            >
          <Icon type="i iconfont icon-paragraph"></Icon>
        </button>-->
        <Divider type="vertical"/>
        <button
          class="button"
          :class="{ 'is-active': isActive.heading({level: 1}) }"
          @click="commands.heading({level: 1})"
        >
          <Icon type="i iconfont icon-h1"></Icon>
        </button>
        <button
          class="button"
          :class="{ 'is-active': isActive.heading({level: 2}) }"
          @click="commands.heading({level: 2})"
        >
          <Icon type="i iconfont icon-h2"></Icon>
        </button>
        <Divider type="vertical"/>
        <button
          class="button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <Icon type="i iconfont icon-ul"></Icon>
        </button>
        <button
          class="button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <Icon type="i iconfont icon-ol"></Icon>
        </button>
        <Divider type="vertical"/>
        <button
          class="button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <Icon type="i iconfont icon-quote"></Icon>
        </button>
        <button
          class="button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <Icon type="i iconfont icon-code-block"></Icon>
        </button>
        <button
          class="button"
          :class="{ 'is-active': isActive.horizontal_rule() }"
          @click="commands.horizontal_rule"
        >
          <Icon type="i iconfont icon-hr"></Icon>
        </button>
        <Divider type="vertical"/>
        <button class="button" @click="commands.undo">
          <Icon type="i iconfont icon-undo"></Icon>
        </button>
        <button class="button" @click="commands.redo">
          <Icon type="i iconfont icon-redo"></Icon>
        </button>
      </div>
    </editor-menu-bar>
    <editor-menu-bubble v-if="enableEditorMenuBubble" :editor="editor">
      <div
        slot-scope="{ commands, isActive, menu }"
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >
        <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
          <Icon class="icon" type="i iconfont icon-bold"></Icon>
        </button>
        <button :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
          <Icon class="icon" type="i iconfont icon-italic"></Icon>
        </button>
        <button :class="{ 'is-active': isActive.code() }" @click="commands.code">
          <Icon class="icon" type="i iconfont icon-code"></Icon>
        </button>
      </div>
    </editor-menu-bubble>
    <editor-floating-menu v-if="enableEditorFloatingMenu" :editor="editor">
      <div
        slot-scope="{ commands, isActive, menu }"
        class="editor-floating-menu"
        :class="{ 'is-active': menu.isActive }"
        :style="`top: ${menu.top}px`"
      >
        <button
          class="button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <Icon class="icon" type="i iconfont icon-h1"></Icon>
        </button>
        
        <button
          class="button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <Icon class="icon" type="i iconfont icon-h2"></Icon>
        </button>
        
        <button
          class="button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <Icon class="icon" type="i iconfont icon-ul"></Icon>
        </button>
        
        <button
          class="button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <Icon class="icon" type="i iconfont icon-ol"></Icon>
        </button>
        
        <button
          class="button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <Icon class="icon" type="i iconfont icon-quote"></Icon>
        </button>
        
        <button
          class="button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <Icon class="icon" type="i iconfont icon-code-block"></Icon>
        </button>
      </div>
    </editor-floating-menu>
    <div class="editor-content-wrapper">
      <editor-content class="editor-content" :editor="editor"></editor-content>
    </div>
  </div>
</template>


<script>
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import {
  Editor,
  EditorContent,
  EditorMenuBar,
  EditorMenuBubble,
  EditorFloatingMenu
} from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  CodeBlockHighlight
} from "tiptap-extensions";
export default {
  components: {
    EditorMenuBar,
    EditorContent,
    EditorMenuBubble,
    EditorFloatingMenu
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    },
    enableEditorMenuBar: {
      type: Boolean,
      default: true
    },
    enableEditorMenuBubble: {
      type: Boolean,
      default: false
    },
    enableEditorFloatingMenu: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: new Editor({
        content: this.value,
        editable: !this.readonly,
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new HorizontalRule(),
          new Heading({ levels: [1, 2] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new CodeBlockHighlight({
            languages: {
              javascript,
              css
            }
          })
        ]
      })
    };
  },
  created() {
    console.log(this.editor);
  },
  watch: {
    readonly() {
      this.editor.setOptions({
        editable: !this.readonly
      });
    },
    value() {
      this.editor.setContent(this.value);
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang="less">
.editor {
  .ProseMirror {
    outline: none;
  }
}
</style>


<style lang="less" scoped>
@border-color: #cbcfd5;
.editor {
  position: relative;
  border: 1px solid @border-color;
  .button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: black;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;
    outline: none;
  }
  .editor-menu {
    padding: 4px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: #f5f7f9;
    border-bottom: @border-color;
    .button {
      background: transparent;
      &.is-active {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
  .editor-content-wrapper {
    padding: 8px;
  }
  .editor-content {
      height: 140px;
      overflow: auto;
  }
  .menububble {
    position: absolute;
    display: flex;
    z-index: 20;
    background: black;
    border-radius: 5px;
    padding: 0.3rem;
    margin-bottom: 0.5rem;
    transform: translateX(-50%);
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;

    &.is-active {
      opacity: 1;
      visibility: visible;
    }
    & button {
      display: inline-flex;
      background: transparent;
      border: 0;
      color: white;
      padding: 0.2rem 0.5rem;
      margin-right: 0.2rem;
      border-radius: 3px;
      cursor: pointer;
      .icon {
        font-size: 14px;
      }

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        background-color: rgba(white, 0.1);
      }

      &.is-active {
        background-color: rgba(white, 0.2);
      }
    }

    & form {
      display: flex;
      align-items: center;
    }

    & input {
      font: inherit;
      border: none;
      background: transparent;
      color: white;
    }
  }
  .editor-floating-menu {
    position: absolute;
    margin-top: -0.25rem;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;
    &.is-active {
      opacity: 1;
      visibility: visible;
    }
    .icon {
      font-size: 14px;
    }
  }
}
</style>

<style lang="less">
.editor {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-touch-callout: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;

    &:focus {
      outline: none;
    }
  }
  *::before,
  *::after {
    box-sizing: border-box;
  }
  a {
    color: inherit;
  }

  h1,
  h2,
  h3,
  p,
  ul,
  ol,
  pre,
  blockquote {
    margin: 1rem 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  h1,
  h2,
  h3 {
    line-height: 1.3;
  }
  position: relative;
  margin: 0 auto 5rem auto;

  &-content {
    word-wrap: break-word;

    * {
      caret-color: currentColor;
    }

    pre {
      padding: 0.7rem 1rem;
      border-radius: 5px;
      background: black;
      color: white;
      font-size: 0.8rem;
      overflow-x: auto;

      code {
        display: block;
      }
    }

    p code {
      display: inline-block;
      padding: 0 0.4rem;
      border-radius: 5px;
      font-size: 0.8rem;
      font-weight: bold;
      background: rgba(black, 0.1);
      color: rgba(black, 0.8);
    }

    ul,
    ol {
      padding-left: 1rem;
    }

    li > p,
    li > ol,
    li > ul {
      margin: 0;
    }

    a {
      color: inherit;
    }

    blockquote {
      border-left: 3px solid rgba(black, 0.1);
      color: rgba(black, 0.8);
      padding-left: 0.8rem;
      font-style: italic;

      p {
        margin: 0;
      }
    }

    img {
      max-width: 100%;
      border-radius: 3px;
    }

    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;

      td,
      th {
        min-width: 1em;
        border: 2px solid grey;
        padding: 3px 5px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;
        > * {
          margin-bottom: 0;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: 0;
        width: 4px;
        z-index: 20;
        background-color: #adf;
        pointer-events: none;
      }
    }

    .tableWrapper {
      margin: 1em 0;
      overflow-x: auto;
    }

    .resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }
  }
}
</style>
