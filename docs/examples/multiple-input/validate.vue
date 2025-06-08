<template>
  <sm-multiple-input
    title="验证"
    :validate-list="validateList"></sm-multiple-input>
</template>

<script setup lang="ts">
import { ValidateItem } from 'strive-molu';

const validateList: ValidateItem[] = [
  {
    validate: (text: string, otherTexts: string[]) => {
      return text.length >= 5 && text.length <= 55;
    },
    errLabel: '标题内容只能在5~55字符之间'
  },
  {
    validate: (text: string, otherTexts: string[], before: string[]) => {
      return before.every((item) => item != text);
    },
    errLabel: '不能包含相同内容'
  }
];
</script>

<style scoped></style>
