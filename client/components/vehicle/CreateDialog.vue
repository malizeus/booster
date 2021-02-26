<template>
  <v-dialog v-model="show" no-click-animation persistent width="500">
    <v-card>
      <v-card-title class="mb-2">
        Create vehicle
      </v-card-title>
      <v-card-text>
        <validation-observer
          v-if="visible"
          ref="form"
          @submit.prevent="$refs.form.handleSubmit(save)"
          tag="form"
          novalidate>
          <validation-provider
            v-slot="{ errors }"
            name="brand"
            rules="required|min:2|max:50"
            outlined>
            <v-text-field
              v-model="vehicle.make"
              :error-messages="errors"
              label="Vehicle brand"
              outlined
              class="mb-3" />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="model"
            rules="required|min:2|max:50"
            outlined>
            <v-text-field
              v-model="vehicle.make"
              :error-messages="errors"
              label="Vehicle model"
              outlined
              class="mb-3" />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="year"
            rules="required"
            outlined>
            <v-text-field
              v-model="vehicle.make"
              :error-messages="errors"
              type="number"
              label="Vehicle year"
              outlined
              class="mb-3" />
          </validation-provider>
          <div class="d-flex justify-end mb-2">
            <v-btn @click="close" text>Cancel</v-btn>
            <v-btn type="submit" text>Save</v-btn>
          </div>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import api from '@/api/vehicle';

const getDefaultData = () => ({
  make: '',
  model: '',
  year: null
});

export default {
  name: 'vehicle-dialog',
  props: {
    visible: { type: Boolean, default: false }
  },
  data: () => ({ vehicle: getDefaultData() }),
  computed: {
    show: {
      get: vm => vm.visible,
      set(value) {
        if (!value) this.close();
      }
    }
  },
  methods: {
    close() {
      this.vehicle = getDefaultData();
      this.$emit('update:visible', false);
    },
    save() {
      return api.create(this.vehicle)
        .then(() => this.close());
    }
  },
  watch: {
    show(val) {
      if (!val) return;
      this.vehicle = getDefaultData();
    }
  }
};
</script>