<template>
  <v-container class="pa-0">
    <v-card>
      <v-card-title style="background-color:#63B0B0; color:white;">
        <span class="headline">
          <p v-if="submodule">Edite o submódulo selecionado.</p>
          <p v-else>Defina o submódulo do domínio do conhecimento.</p>
        </span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation="lazy-validation">
          <v-text-field
            v-model="subModuloTitle"
            :rules="subModuloTitleRules"
            label="Título do submódulo"
            required="required"
          ></v-text-field>

          <v-text-field
            v-model="subModuloSubtitle"
            :rules="subModuloSubtitleRules"
            label="Subtítulo do submódulo"
            required="required"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" height="49" dark="dark" large="large" @click="reset">
          Close
          <v-icon dark="dark" right="right">mdi-close</v-icon>
        </v-btn>
        <v-btn color="success" height="49" dark="dark" large="large" @click="validate">
          Save
          <v-icon dark="dark" right="right">mdi-content-save</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "SubModuloDialog",
  props: ["domain", "module", "submodule", "dialog"],
  data: () => ({
    valid: true,
    subModuloTitle: "",
    subModuloTitleRules: [
      v => !!v || "É necessário descrever o título do submódulo",
      v =>
        (v && v.length <= 40) ||
        "O título do módulo deve ter no máximo 40 caracteres"
    ],
    subModuloSubtitle: "",
    subModuloSubtitleRules: [
      v => !!v || "É necessário descrever o subtítulo do submódulo",
      v =>
        (v && v.length <= 40) ||
        "O subtítulo do módulo deve ter no máximo 40 caracteres"
    ],
    select: null,
    checkbox: false,
    modulos: ""
  }),
  watch: {
    dialog: function() {
      var vm = this;
      this.$nextTick(function() {
        vm.subModuloTitle = vm.submodule.namemodule;
        vm.subModuloSubtitle = vm.submodule.subtitle;
      });
    },
    submodule: function() {
      var vm = this;
      this.$nextTick(function() {
        vm.subModuloTitle = vm.submodule.namemodule;
        vm.subModuloSubtitle = vm.submodule.subtitle;
      });
    }
  },
  methods: {
    async postSubModulo() {
      await axios.post(
        `http://localhost:8000/module/`,
        {
          fk_idmodule: this.module.url,
          namemodule: this.subModuloTitle,
          subtitle: this.subModuloSubtitle,
          idknowledgedomain: this.domain.url
        },
        {
          auth: {
            username: "admin",
            password: "admin"
          }
        }
      );
    },
    async putSubModulo() {
      await axios.put(
        "http://127.0.0.1:8000/module/" + this.submodule.idmodule + "/",
        {
          fk_idmodule: this.module.url,
          namemodule: this.subModuloTitle,
          subtitle: this.subModuloSubtitle,
          idknowledgedomain: this.domain.url
        },
        {
          auth: {
            username: "admin",
            password: "admin"
          }
        }
      );
    },
    async validate() {
      if (this.$refs.form.validate()) {
        this.$refs.form.validate();
        if (this.submodule === "") {
          await this.postSubModulo();
        } else {
          await this.putSubModulo();
        }
        this.$emit("close_or_save", "save");
        this.$refs.form.reset();
      }
    },

    reset() {
      this.$emit("close_or_save", "close");
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>