<template>
  <v-container class="pa-0">
    <v-card>
      <v-card-title style="background-color:#63B0B0; color:white;">
        <span class="headline">
          <p v-if="module">Edite o módulo selecionado.</p>
          <p v-else>Defina o módulo do domínio do conhecimento.</p>
        </span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="moduloTitle"
            :rules="moduloTitleRules"
            label="Título do módulo"
            required
          ></v-text-field>

          <v-text-field
            v-model="moduloSubtitle"
            :rules="moduloSubtitleRules"
            label="Subtítulo do módulo"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" height="49" dark large @click="reset">
          Close
          <v-icon dark right>mdi-close</v-icon>
        </v-btn>
        <v-btn color="success" height="49" dark large @click="validate">
          Save
          <v-icon dark right>mdi-content-save</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "ModuloDialog",
  props: ["domain", "module", "dialog"],
  data: () => ({
    valid: true,
    moduloTitle: "",
    moduloTitleRules: [
      v => !!v || "É necessário descrever o título do submódulo",
      v =>
        (v && v.length <= 40) ||
        "O título do módulo deve ter no máximo 40 caracteres"
    ],
    moduloSubtitle: "",
    moduloSubtitleRules: [
      v => !!v || "É necessário descrever o subtítulo do submódulo",
      v =>
        (v && v.length <= 40) ||
        "O subtítulo do módulo deve ter no máximo 40 caracteres"
    ],
    select: null,
    newItems: [],
    checkbox: false,
    modulos: ""
  }),
  watch: {
    dialog: function() {
      var vm = this;
      this.$nextTick(function() {
        vm.moduloTitle = vm.module.namemodule;
        vm.moduloSubtitle = vm.module.subtitle;
      });
    },
    module: function() {
      this.$refs.form.reset();
      var vm = this;
      this.$nextTick(function() {
        vm.moduloTitle = vm.module.namemodule;
        vm.moduloSubtitle = vm.module.subtitle;
      },60);
    }
  },
  methods: {
    async postModulo() {
      // var vm = this;
      await axios
        .post(
          `http://localhost:8000/module/`,
          {
            fkidmodule: null,
            namemodule: this.moduloTitle,
            subtitle: this.moduloSubtitle,
            idknowledgedomain: this.domain.url
          },
          { auth: { username: "admin", password: "admin" } }
        )
        .then(function(/*resposta*/) {
          /*vm.moduloTitle = resposta.data.namemodule;
          vm.subTitle = resposta.data.subtitle;*/
        });
    },
    async putModulo() {
      var vm = this;
      await axios
        .put(
          "http://127.0.0.1:8000/module/" + this.module.idmodule + "/",
          {
            fk_idmodule: null,
            namemodule: this.moduloTitle,
            subtitle: this.moduloSubtitle,
            idknowledgedomain: this.domain.url
          },
          { auth: { username: "admin", password: "admin" } }
        )
        .then(function(resposta) {
          vm.moduloTitle = resposta.data.namemodule;
          vm.moduloSubtitle = resposta.data.subtitle;
        });
    },
    async validate() {
      if (this.$refs.form.validate()) {
        this.$refs.form.validate();
        if (this.module === "") {
          await this.postModulo();
        } else {
          await this.putModulo();
        }
        this.$emit("close_or_save", "save");
      }
      this.$refs.form.reset();
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