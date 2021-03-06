<template>
  <v-dialog v-model="show" width="500" no-click-animation persistent>
    <v-card>
      <v-card-title primary-title class="primary mb-6">
        <v-avatar color="primary lighten-1" size="38" class="mr-3">
          <v-icon color="secondary accent-1">mdi-plus</v-icon>
        </v-avatar>
        <div class="text-truncate white--text">Create vehicle</div>
      </v-card-title>
      <v-card-text>
        <v-alert
          :value="!!error"
          color="pink lighten-1"
          transition="fade-transition"
          dismissible text dense
          class="mb-7 text-left">
          {{ error }}
        </v-alert>
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
              outlined />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="model"
            rules="required|min:2|max:50"
            outlined>
            <v-text-field
              v-model="vehicle.model"
              :error-messages="errors"
              label="Vehicle model"
              outlined />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="year"
            rules="required"
            outlined>
            <v-text-field
              v-model="vehicle.year"
              :error-messages="errors"
              type="number"
              label="Vehicle year"
              outlined />
          </validation-provider>
          <div class="d-flex justify-end">
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

const UNIQUE_VEHICLE_ERROR = 'Vehicle already exists!';

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
  data: () => ({ vehicle: getDefaultData(), error: null }),
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
      Object.assign(this, { vehicle: getDefaultData(), error: null });
      this.$emit('update:visible', false);
    },
    async save() {
      return api.create(this.vehicle)
        .then(() => this.close())
        .catch(() => Object.assign(this, { error: UNIQUE_VEHICLE_ERROR }));
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
