<!-- eslint-disable max-len -->
<template>
    <div ref="root" class="u-date-editor">
        <svg class="u-date-editor-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
             viewBox="0 0 16 16">
            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
        </svg>
        <input ref="input" class="u-date-input" type="text" :value="formatValue" :placeholder="placeholder"
               @focus="showPicker = true" @change="inputChange">
    </div>
    <teleport to="body">
        <div ref="datePicker" class="u-date-picker" v-show="showPicker === true" :style="pickerPosition">
            <div class="u-date-picker-header">
                <div class="u-date-picker-prev-year" @click="prevYearClick">«</div>
                <div class="u-date-picker-prev-month"
                     v-show="shownType === types.date"
                     @click="prevMonth"
                >‹
                </div>
                <div class="u-date-picker-header-label" @click="showYear">{{yearLabel}}</div>
                <div class="u-date-picker-header-label"
                     v-show="shownType === types.date"
                     @click="showMonth"
                >{{shownMonth}}月
                </div>
                <div class="u-date-picker-next-year" @click="nextYearClick">»</div>
                <div class="u-date-picker-next-month"
                     v-show="shownType === types.date"
                     @click="nextMonth"
                >›
                </div>
            </div>
            <div class="u-date-picker-body">
                <div class="u-date-table" v-show="shownType === types.date">
                    <div class="u-date-days">
                        <div>日</div>
                        <div>一</div>
                        <div>二</div>
                        <div>三</div>
                        <div>四</div>
                        <div>五</div>
                        <div>六</div>
                    </div>
                    <div class="u-date-list">
                        <div class="u-date-item-prev"
                             v-for="d in prevMonthDateList"
                             :key="d"
                             @click="choiceDate(d, -1)"
                        ><span>{{d}}</span></div>
                        <div class="u-date-item-current"
                             :key="d"
                             v-for="d in currentMonthDateList"
                             :class="{
                         // eslint-disable-next-line max-len
                         'is-active': dateObj && dateObj.getFullYear() === shownYear && dateObj.getMonth() === shownMonth - 1 && dateObj.getDate() === d,
                         // eslint-disable-next-line max-len
                         'is-now': shownYear === nowYear && shownMonth === nowMonth && d === nowDate
                         }"
                             @click="choiceDate(d)"
                        ><span>{{d}}</span></div>
                        <div class="u-date-item-next"
                             :key="d"
                             v-for="d in nextMonthDateList"
                             @click="choiceDate(d, 1)"
                        ><span>{{d}}</span></div>
                    </div>
                </div>
                <div class="u-month-table" v-show="shownType === types.month">
                    <div class="u-month-item"
                         v-for="(m, i) in ['一','二','三','四','五','六','七','八','九','十','十一','十二']"
                         :key="m"
                         @click="monthClick(i)">
                        {{m}}月
                    </div>
                </div>
                <div class="u-year-table" v-show="shownType === types.year">
                    <div class="u-year-item"
                         v-for="n in 10"
                         :key="n"
                         @click="yearClick(shownStartYear + n - 1)"
                    >{{shownStartYear + n - 1}}
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import {
  defineComponent, computed, ref, watch, reactive,
} from 'vue';

import { getMonthDays, dateFormatter, isValidDate } from '@/utils/date';

export default defineComponent({
  name: 'UDatePicker',
  props: {
    placeholder: {
      type: String,
      default: '选择日期',
    },
    modelValue: {
      type: [Date, String, Number],
      default: '',
    },
    value: {
      type: [Date, String, Number],
      default: '',
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD',
    },
    valueFormat: {
      type: String,
    },
  },
  emits: ['update:model-value', 'change'],
  setup(props, ctx) {
    const showPicker = ref(false);
    const dateObj = computed(() => new Date(props.modelValue || props.value));
    const formatValue = computed(() => (isValidDate(dateObj.value) ? dateFormatter(dateObj.value, props.format) : ''));
    let nowObj = new Date();
    nowObj = new Date(nowObj.getFullYear(), nowObj.getMonth(), nowObj.getDate());
    const nowYear = nowObj.getFullYear();
    const nowMonth = nowObj.getMonth() + 1;
    const nowDate = nowObj.getDate();
    const shownDateObj = ref((isValidDate(dateObj.value) ? new Date(dateObj.value) : new Date()));
    const shownYear = computed(() => shownDateObj.value.getFullYear());
    const shownMonth = computed(() => shownDateObj.value.getMonth() + 1);
    const currentMonthDays = computed(() => getMonthDays(shownYear.value, shownMonth.value));
    const currentMonthDateList = computed(() => Array.from(new Array(currentMonthDays.value))
      .map((_, i) => i + 1));
    const prevMonthDays = computed(() => getMonthDays(
      shownMonth.value === 1 ? shownYear.value - 1 : shownYear.value,
      shownMonth.value === 1 ? 12 : shownMonth.value - 1,
    ));
    const prevMonthDateListLength = computed(() => {
      const date = new Date(shownDateObj.value);
      date.setDate(1);
      return date.getDay();
    });
    const prevMonthDateList = computed(() => Array.from(new Array(prevMonthDateListLength.value))
      .map((_, i) => prevMonthDays.value + 1 - prevMonthDateListLength.value + i));
    const nextMonthDateList = computed(() => {
      const length = 42 - prevMonthDateListLength.value - currentMonthDays.value;
      return Array.from(new Array(length)).map((_, i) => i + 1);
    });
    const types = {
      year: Symbol('year'),
      month: Symbol('month'),
      date: Symbol('date'),
    };

    const shownType = ref(types.date);
    const shownStartYear = computed(() => shownYear.value - (shownYear.value % 10));
    const shownEndYear = computed(() => shownStartYear.value + 9);
    const yearLabel = computed(() => {
      if (shownType.value === types.year) {
        return `${shownStartYear.value}年-${shownEndYear.value}年`;
      }
      return `${shownYear.value}年`;
    });

    const prevMonth = () => {
      shownDateObj.value = new Date(
        shownDateObj.value.setMonth(shownDateObj.value.getMonth() - 1),
      );
    };

    const nextMonth = () => {
      shownDateObj.value = new Date(
        shownDateObj.value.setMonth(shownDateObj.value.getMonth() + 1),
      );
    };

    const prevYear = () => {
      shownDateObj.value = new Date(
        shownDateObj.value.setFullYear(shownDateObj.value.getFullYear() - 1),
      );
    };

    const nextYear = () => {
      shownDateObj.value = new Date(
        shownDateObj.value.setFullYear(shownDateObj.value.getFullYear() + 1),
      );
    };

    const prevYearClick = () => {
      if (shownType.value === types.year) {
        shownDateObj.value = new Date(
          shownDateObj.value.setFullYear(shownDateObj.value.getFullYear() - 10),
        );
      }
      prevYear();
    };

    const nextYearClick = () => {
      if (shownType.value === types.year) {
        shownDateObj.value = new Date(
          shownDateObj.value.setFullYear(shownDateObj.value.getFullYear() + 10),
        );
      }
      nextYear();
    };

    const showMonth = () => {
      shownType.value = types.month;
    };

    const showYear = () => {
      shownType.value = types.year;
    };

    const monthClick = (month: number) => {
      shownDateObj.value = new Date(shownDateObj.value.setMonth(month));
      shownType.value = types.date;
    };

    const yearClick = (year: number) => {
      shownDateObj.value = new Date(shownDateObj.value.setFullYear(year));
      shownType.value = types.month;
    };

    const choiceDate = (date: number, monthDiff = 0) => {
      const oldDateTime = shownDateObj.value.getTime();
      shownDateObj.value.setMonth(shownDateObj.value.getMonth() + monthDiff);
      shownDateObj.value = new Date(shownDateObj.value.setDate(date));
      if (shownDateObj.value.getTime() !== oldDateTime) {
        ctx.emit('update:model-value', new Date(shownDateObj.value));
        ctx.emit('change', props.valueFormat ? dateFormatter(new Date(shownDateObj.value), props.valueFormat) : new Date(shownDateObj.value));
      }

      showPicker.value = false;
    };

    const inputChange = ($event: Event) => {
      showPicker.value = false;
      ctx.emit('update:model-value', new Date(($event.target as HTMLInputElement).value));
    };

    const pickerPosition = reactive({
      top: '',
      right: '',
      bottom: '',
      left: '',
    });

    const root = ref();
    const input = ref();
    const datePicker = ref();

    const setPickerPosition = () => {
      const inputRect = (input.value as HTMLElement).getBoundingClientRect();
      const bodyRect = document.body.getBoundingClientRect();

      pickerPosition.top = `${inputRect.top - bodyRect.top + inputRect.height + 10}px`;
      pickerPosition.left = `${inputRect.left - bodyRect.left}px`;
    };

    const isInElement = (el: HTMLElement, offSpringEl: HTMLElement) => {
      let currentEl: HTMLElement = el;

      while (currentEl !== offSpringEl && currentEl !== document.documentElement) {
        currentEl = currentEl.parentElement as HTMLElement;
      }

      return currentEl === offSpringEl;
    };

    const clickEventHandler = (e: Event) => {
      if (isInElement(e.target as HTMLElement, root.value)) return;
      if (isInElement(e.target as HTMLElement, datePicker.value)) return;

      showPicker.value = false;
    };

    watch(showPicker, (newVal) => {
      if (!newVal) {
        document.removeEventListener('scroll', setPickerPosition);
        document.body.removeEventListener('scroll', setPickerPosition);
        document.removeEventListener('click', clickEventHandler);
        return;
      }
      setPickerPosition();
      document.addEventListener('scroll', setPickerPosition);
      document.body.addEventListener('scroll', setPickerPosition);
      document.addEventListener('click', clickEventHandler);
    });

    return {
      dateObj,
      showPicker,
      formatValue,
      nowYear,
      nowMonth,
      nowDate,
      shownYear,
      shownMonth,
      prevMonthDateList,
      currentMonthDateList,
      nextMonthDateList,
      types,
      shownType,
      shownStartYear,
      yearLabel,
      pickerPosition,

      // methods
      prevMonth,
      nextMonth,
      prevYear,
      nextYear,
      prevYearClick,
      nextYearClick,
      showMonth,
      showYear,
      monthClick,
      yearClick,
      choiceDate,
      inputChange,

      // refs
      root,
      input,
      datePicker,
    };
  },
});
</script>

<style lang="scss">
@import "date-picker";
</style>
