<template>
  <div class="inside-wrapper">
    <div></div>
    <v-container>
      <v-row>
        <v-col lg="10" cols="12">
          <h1 class="inside-wrapper__header">Введите код или название валюты</h1>
          <v-autocomplete
            :items="namesList"
            v-model="model"
            :label="model"
            placeholder="Введите код или название валюты"
            solo
            @change="filter"
          ></v-autocomplete>
        </v-col>
        <v-col>
          <h1 class="inside-wrapper__header">Основная валюта</h1>
          <v-select
            :items="codes"
            v-model="current"
            label="RUB"
            solo
            @change="selectBase"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="item, index in filteredCurrency" :key="index"
        lg="4" md="6" cols="12"
        >
          <v-card >
            <v-card-subtitle>
              {{item.Name}}
            </v-card-subtitle>
            <div class="currency-block">
              <div class="currency-block__element">
                <span>1 {{item.CharCode}}</span>
                <v-icon class="currency-block__element__icon_differ">
                  mdi-arrow-left-right
                </v-icon>
                <span>{{ item.Value.toFixed(4) }} {{current}}</span>
              </div>
              <div class="currency-block__element" :style="{color: item.differency ? 'green' : 'red'}">
                <v-icon class="currency-block__element__icon" :style="{color: item.differency ? 'green' : 'red'}">{{ item.differency ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
                <span>{{item.difference}}</span>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getCurrencyList } from "@api"
import { SET_CURRENCY } from "../store"

export default {
  name: 'Currency',
  data: () => ({
    currency: [],
    namesList: ['Все'],
    codes: [],
    model: 'Все',
    current: 'RUB',
    filteredCurrency:[],
    filterTag: 'Все',
  }),
  created() {
    this.getCurrency()
  },
  methods: {
    async getCurrency() {
      try {
        if (this.$store.state.currency) {
          this.currency = this.$store.state.currency
        } else {
          this.currency = await getCurrencyList()
          this.$store.commit(SET_CURRENCY, this.currency);
        }
        this.currency.forEach(el => {
          this.namesList.push(`${el.Name} (${el.CharCode})`)
          this.codes.push(el.CharCode)
        })
        this.filteredCurrency = this.currency
      } catch (error) {
        console.log(error);
      }    
    },
    selectBase(base) {
      console.log(this.filteredCurrency);
      const baseValue = this.currency.find(el => el.CharCode === base)
      this.filteredCurrency = this.currency.map(el => ({
        ...el,
        Value: baseValue.Value / el.Value,
        Previous: baseValue.Previous / el.Previous,
        difference: Math.round((((baseValue.Value / el.Value) - (baseValue.Previous / el.Previous))) * 10000) / 10000,
        differency: (baseValue.Value / el.Value > baseValue.Previous / el.Previous)
      }))
      if(this.filterTag !== 'Все') {
        this.filteredCurrency = this.filteredCurrency.filter(
          (item) => item.CharCode === this.filterTag.slice(this.filterTag.length - 4, this.filterTag.length -1)
        );
      }
    },
    filter(base) {
      if(base === 'Все') {
        this.filteredCurrency = this.currency
      } else {
        this.filteredCurrency = this.currency.filter(
          (item) => item.CharCode === base.slice(base.length - 4, base.length -1)
        );
      }
      this.filterTag = base;
    }
  }
};
</script>

<style lang="scss" scoped>
.inside-wrapper {
  &__header {
    font-size: 18px;
    margin-bottom: 12px;
  }
}
.currency-block {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  &__element {
    display: flex;
    align-items: center;
    &__icon{
      margin-bottom: 4px;
      &_differ {
        padding: 0 12px;
      }
    }
  }
}
</style>