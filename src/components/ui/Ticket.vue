<template>
  <div class="ticket rounded shadow">
    <div class="ticket-content d-flex flex-column rounded-left px-5 py-3">
      <div class="ticket-content-trip d-flex flex-grow-1 align-items-center">
        <div class="ticket-content-airline">
          <img :src="getCarrierIconSrc" :alt="getItinerary['carrier_name']" />
          <span v-text="getItinerary['carrier_name']"></span>
        </div>

        <div class="ticket-content-datetime d-flex flex-column align-items-center px-4">
          <span class="ticket-content-date d-block" v-text="getSplitDate(getDeparture['dep_time'])"></span>
          <span class="ticket-content-time d-block" v-text="getSplitTime(getDeparture['dep_time'])"></span>
        </div>

        <div class="ticket-content-path d-flex flex-grow-1 align-items-start position-relative">
          <span class="path-dep-text text-dark" v-text="getDeparture['origin_code']"></span>

          <div class="d-flex flex-grow-1 flex-column align-items-center">
            <span class="path-travel-time mb-3" v-text="getTravelTime"></span>
            <span class="path-travel-stops" v-html="getTravelStops"></span>
          </div>

          <span class="path-arr-text text-dark" v-text="getDestination['dest_code']"></span>

          <div class="path-break-lines">
            <div class="path-dep-breakpoint"></div>
            <div class="path-arr-breakpoint"></div>
            <div class="path-main-line"></div>
            <div v-if="getItinerary['stops'] >= 1" class="path-stop-breakpoint"></div>
          </div>
        </div>

        <div class="ticket-content-datetime d-flex flex-column align-items-center px-4">
          <span class="ticket-content-date d-block" v-text="getSplitDate(getDestination['arr_time'])"></span>
          <span class="ticket-content-time d-block" v-text="getSplitTime(getDestination['arr_time'])"></span>
        </div>
      </div>

      <div class="ticket-content-highlights">
        <highlight-text class="mr-4" v-text="placeholders.details" />
        <highlight-text class="mr-4" v-text="placeholders.requirements" />
        <span class="ml-4">
          <img class="mr-2" src="../../assets/icon-non-refundable.svg" alt="Non refundable">
          <span class="ticket-content-non-refundable text-dark" v-text="placeholders.nonRefundable"></span>
        </span>
      </div>
    </div>

    <div class="ticket-price rounded-right px-4 py-3">
      <p class="ticket-price-value" v-text="`${ data.price } ${ data.currency }`"></p>
      <btn class="btn-block font-weight-bold" block bold v-text="placeholders.select"></btn>
      <p class="ticket-price-tip text-dark text-center mt-2" v-text="placeholders.tip"></p>
      <div class="d-flex align-items-center justify-content-between">
        <span v-text="placeholders.bag"></span>
        <span class="ticket-price-additional-bag" v-text="placeholders.addBag"></span>
      </div>
    </div>
  </div>
</template>

<script>
import HighlightText from "./HighlightText";
import Btn from './Btn'

export default {
  name: "Ticket",
  components: {
    HighlightText,
    Btn
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      placeholders: {
        details: 'Детали перелета',
        requirements: 'Условия тарифа',
        nonRefundable: 'невозвратный',
        select: 'Выбрать',
        tip: 'Цена за всех пассажиров',
        bag: 'Нет багажа',
        addBag: '+ Добавить багаж'
      }
    }
  },
  computed: {
    getCarrierIconSrc() {
      return `https://aviata.kz/static/airline-logos/21x21/${ this.getItinerary['carrier'] }.png`
    },

    getItinerary() {
      return this.data.itineraries[0][0]
    },

    getDeparture() {
      return this.getItinerary['segments'][0]
    },

    getDestination() {
      return this.getItinerary['segments'][this.getItinerary['segments'].length - 1]
    },

    getTravelTime() {
      const seconds = this.getItinerary['traveltime'];
      return `${ Math.floor(seconds / 3600) } ч ${ Math.floor(seconds / 60) % 60 } м`
    },

    getStopTime() {
      const arrTime = new Date(this.getDeparture['dep_time_iso'])
      const destTime = new Date(this.getDestination['arr_time_iso'])

      // Convert milliseconds to seconds
      const difference = (destTime - arrTime) / 1000

      const minutes = Math.floor((difference / 60) % 60)
      const hours = Math.floor((difference / 3600) % 24)

      return `${ hours } ч ${ minutes} м`
    },

    getTravelStops() {
      if (this.getItinerary['stops'] === 0) {
        return '<span class="text-primary">прямой рейс</span>'
      } else if (this.getItinerary['stops'] === 1) {
        return `<span class="text-warning">через ${ this.getDeparture['dest'] }, ${ this.getStopTime }</span>`
      } else {
        return `<span class="text-warning">${ this.getItinerary['stops'] } пересадки</span>`
      }
    }
  },
  methods: {
    getSplitDate(datetime) {
      return datetime.split(' ').slice(0, 3).join(' ')
    },

    getSplitTime(datetime) {
      return datetime.split(' ').slice(3).join(' ')
    },
  }
}
</script>

<style scoped lang="scss">

  @import '../../variables';

  .ticket {
    display: flex;
    align-items: stretch;
  }

  .ticket-content {
    width: 70%;
    background-color: $aviata-white;
  }

  .ticket-content-airline {
    span {
      font-weight: 600;
      font-size: 1.2rem;
      float: right;
      margin-left: 1rem;
    }
  }

  .ticket-content-date {
    font-size: 1rem;
    line-height: 1;
  }

  .ticket-content-time {
    font-size: 2rem;
    font-weight: 600;
  }

  .path-dep-text,
  .path-arr-text {
    font-size: 10px;
    color: $aviata-gray;
  }

  .path-main-line {
    position: absolute;
    bottom: 50%;
    left: 0;
    width: 100%;
    border-bottom: 1px solid $aviata-gray;
  }

  .path-dep-breakpoint,
  .path-arr-breakpoint,
  .path-stop-breakpoint {
    border-radius: 50%;
    border: 1px solid $aviata-gray;
    background-color: $aviata-white;
    position: absolute;
    bottom: calc(50% - 6px / 2);
    z-index: 1;
    width: 7px;
    height: 7px;
  }

  .path-dep-breakpoint {
    left: 0;
  }

  .path-stop-breakpoint {
    left: calc(50% - 7px / 2);
  }

  .path-arr-breakpoint {
    right: 0;
  }

  .ticket-content-non-refundable {
    font-family: Arial, 'Open Sans', sans-serif;
  }

  .ticket-price {
    width: 30%;
    background-color: $aviata-primary-background-color;
  }

  .ticket-price-value {
    font-size: 2rem;
    line-height: 1.2;
    font-family: Arial, 'Open Sans', sans-serif;
    text-align: center;
  }

  .ticket-price-tip {
    line-height: 1.4;
  }

  .ticket-price-additional-bag {
    border-radius: 2px;
    background: $aviata-light-blue;
    color: $aviata-blue;
    font-weight: 600;
    padding: 0.25rem 1rem;
    text-align: center;
  }

</style>
