<template>
  <div class="contacts-address-card" :id="contact.slug">
    <h1>{{ contact.name }} <icon class="icon icon-arrow red" v-b-toggle="`collapse-card-${contact.slug}`"></icon></h1>
    <b-collapse :visible="visibility" :id="`collapse-card-${contact.slug}`" class="mt-2">
      <b-col cols="12" lg="10" offset-lg="1 " class="contacts-card-content">
        <p><icon class="icon icon-pin float-left"></icon>{{ contact.address }}</p>
        <p><icon class="icon icon-mail float-left"></icon>{{ contact.email }}</p>
        <p><icon class="icon icon-phone float-left"></icon>{{ phones() }}</p>
        <div class="contacts-card-hours">
          <icon class="icon icon-door float-left"></icon>
          <ul>
            <li v-for="hours in contact.hours" :key="hours.id">
              <span class="contacts-card-label">{{ hours.label }}:</span>{{ hours.time }}</li>
          </ul>
        </div>
        <div class="contacts-card-content" v-html="contact.content"></div>
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
  methods: {
    phones: function () {
      var phones = []
      for (var i = 0; i < this.contactData.phones.length; i++) {
        phones.push(this.contactData.phones[i].phone)
      }
      return phones.join(', ')
    }
  }
}
</script>

<style>

</style>
