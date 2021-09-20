<template>
  <div class="inside-wrapper">
    <v-card width="360px" elevation="24">
      <v-card-subtitle>
        {{currentCurrency.Name}}
      </v-card-subtitle>
      <div class="currency-block">
        <v-select
          :items="codes"
          v-model="current"
          label="RUB"
          solo
          @change="selectBase"
        ></v-select>
        <v-text-field
        v-model="selectedBase"
        :rules="[rules.number]"
        @input="calculate" 
        class="currency-block__input"
        label="Введите сумму"></v-text-field>
      </div>
    </v-card>
    <v-btn
      elevation="24"
      icon
      class="currency-block__button"
      @click="handleChangeCurrency()"
    >
      <v-icon
      color="#269bff"
      >mdi-arrow-left-right</v-icon>
    </v-btn>
    <v-card width="360px" elevation="24">
      <v-card-subtitle>
        {{currentResult.Name}}
      </v-card-subtitle>
      <div class="currency-block">
        <v-select
          :items="codes"
          v-model="selectedSecond"
          :label="currentResult.CharCode"
          solo
          @change="selectSecond"
        ></v-select>
        <span class="currency-block__result">
          {{result.toFixed(4)}}
        </span>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Convertion',
  data: () => ({
    codes: ['RUB'],
    current: 'RUB',
    currentCurrency: null,
    currentResult: {},
    currency: [],
    result: 0,
    selectedSecond: 'AMD',
    selectedBase: 0,
    rules: {
      number: (value) => {
        return (
          (!Number.isNaN(value) && value > -1) ||
          'Значение должно быть положительным целым числом.'
        );
      },
    }
  }),
  created() {
    this.getCurrency()
  },
  methods: {
    async getCurrency() {
      this.currency = [{
        Name: "Российский рубль",
        CharCode: "RUB",
        Value: 1,
      },...this.$store.getters.currency]
      this.currentCurrency = this.currency[0]
      this.currentResult = this.currency[1]
      this.currency.forEach(el => this.codes.push(el.CharCode))
    },
    selectBase(base) {
      this.currentCurrency = this.currency.find(el => el.CharCode === base)
      this.result = +this.selectedBase * this.currentCurrency.Value / this.currentResult.Value
    },
    selectSecond(base) {
      this.currentResult = this.currency.find(el => el.CharCode === base)
      this.result = +this.selectedBase * this.currentCurrency.Value / this.currentResult.Value 
    },
    calculate(value) {
      if (!Number.isNaN(value) && value > -1) {
        this.result = value * this.currentCurrency.Value / this.currentResult.Value 
      }
      
    },
    handleChangeCurrency() {
      let handler = this.currentCurrency
      this.currentCurrency = this.currentResult
      this.currentResult = handler
      handler = this.current 
      this.current = this.selectedSecond
      this.selectedSecond = handler
      this.result = +this.selectedBase * this.currentCurrency.Value / this.currentResult.Value
    }
  }
};
</script>

<style lang="scss" scoped>
.inside-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.currency-block {
  display: flex;
  padding: 12px;
  &__input {
    padding-left: 12px;
    width: 100%;
  }
  &__result {
    width: 100%;
    margin: 24px;
  } 
  &__button {
    margin: 0 24px;
  }
}
</style>