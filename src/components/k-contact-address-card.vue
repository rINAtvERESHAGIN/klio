<template>
  <div class="contacts-address-card" :id="contact.slug">
    <h1>{{ contact.name }} <icon class="icon icon-arrow red" v-b-toggle="`collapse-card-${contact.slug}`"></icon></h1>
    <b-collapse :visible="visibility" :id="`collapse-card-${contact.slug}`" class="mt-2">
      <b-col cols="12" lg="10" offset-lg="1 " class="contacts-card-content">
        <p>
          <icon class="icon icon-pin float-left"/>
          {{ contact.address }}
        </p>
        <p>
          <icon class="icon icon-mail float-left"/>
          <a :href="`mailto:${contact.email}`">
            <span style="color: black">{{ contact.email }}</span>
          </a>
        </p>
        <p>
          <icon class="icon icon-phone float-left"/>
          <a v-for="(phone, index) in phoneContacts"
             :key="index"
             :href="`tel:${phone}`"
             style="margin-right: 8px"
          >
            <span style="color: black">{{phone}}</span>
          </a>
        </p>
        <div class="contacts-card-hours">
          <icon class="icon icon-door float-left"/>
          <ul>
            <li v-for="hours in contact.hours" :key="hours.id">
              <span class="contacts-card-label">{{ hours.label }}:</span>{{ hours.time }}</li>
          </ul>
        </div>
        <div class="contacts-card-content" v-html="contact.content"/>
        <div class="contacts-card-map">
          <iframe :src="contact.map" width="100%" height="400" frameborder="1" allowfullscreen="true"></iframe>
        </div>
      </b-col>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: ['contactData', 'visibility'],
  data () {
    return {
      contact: this.contactData
    }
  },
  computed: {
    phoneContacts: function () {
      const phones = []
      for (let i = 0; i < this.contactData.phones.length; i++) {
        phones.push(this.contactData.phones[i].phone)
      }
      // return phones.join(', ')
      return phones
    }
  },
  methods: {
    phones: function () {
      const phones = []
      for (let i = 0; i < this.contactData.phones.length; i++) {
        phones.push(this.contactData.phones[i].phone)
      }
      return phones.join(', ')
    }
  }
}
</script>

<style>

</style>
