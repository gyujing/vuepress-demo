import { isNull, setValidData } from '../Validate';
import sfc from '../utils/sfc';

const { def, bem } = sfc('button');

export default def({
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    handler: {
      type: Function,
      default: () => { },
    },
    successMsg: {
      type: String,
      default: '',
    },
    errMsg: {
      type: String,
      default: '',
    },
    confirmHint: {
      type: String,
      default: '',
    },
    confirmMark: {
      type: Boolean,
      default: true,
    },
    confirmCancelHint: {
      type: String,
      default: '',
    },
    confirmBatchHint: {
      type: String,
      default: '',
    },
    batchDataList: {
      type: Array,
      default: () => ([]),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      btnLoading: false,
      defaultOpts: {
        type: 'primary',
        size: 'medium',
      },
    };
  },
  methods: {
    async handleClick(event) {
      if (this.loading || this.btnLoading) {
        return;
      }
      let func = null;
      if (this.$listeners.click && typeof this.$listeners.click === 'function') {
        func = this.$listeners.click;
      } else if (typeof this.handler === 'function') {
        func = this.handler;
      }
      if (func) {
        try {
          if (this.confirmBatchHint && isNull(this.batchDataList)) {
            this.$message.warning(this.confirmBatchHint);
            return;
          }
          if (this.confirmHint) {
            await this.$confirm(`${this.confirmHint.replace(/[?|？]$/, '')}${this.confirmMark ? '？' : ''}`, '提示');
          }
        } catch (e) {
          if (!isNull(this.confirmCancelHint)) {
            this.$message.info(this.confirmCancelHint);
          }
          return;
        }
        this.btnLoading = true;
        Promise.resolve(func(this.batchDataList)).then((res) => {
          if (res === false) {
            if (this.errMsg) {
              this.$message.error(`${this.errMsg}`);
            }
            return;
          }
          if (this.successMsg) {
            this.$message.success(this.successMsg);
          }
          this.$emit('clickComplete');
        }).catch(() => {
          if (this.errMsg) {
            this.$message.error(`${this.errMsg}`);
          }
        }).finally(() => {
          this.btnLoading = false;
        });
      }
      event.preventDefault();
    },
  },
  render(h) {
    const self = this;
    return (<el-button ref="gu-button" class={[bem(''), self.$attrs.type === 'text-default' ? bem('text-default') : '', self.$attrs.class || '']}
      {...{
        props: {
          ...self.defaultOpts,
          disabled: self.disabled,
          ...self.$attrs,
          loading: self.loading || self.btnLoading,
          type: self.$attrs.type === 'text-default' ? 'default' : (self.$attrs.type || self.defaultOpts.type),
          plain: self.$attrs.type === 'text-default' ? true : setValidData(self.$attrs.plain, false),
        },
        style: self.$attrs.style,
        on: {
          ...self.$listeners,
          click: self.handleClick,
        },
      }}
    >
      {self.label}
      {self.$scopedSlots.default && self.$scopedSlots.default()}
    </el-button>);
  },
});
