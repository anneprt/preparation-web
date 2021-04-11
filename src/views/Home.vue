<template>
  <div class="home container-fluid">
    <b-btn class="mb-2" variant="success" @click="showModalAjoutUtilisateur"
      >Ajouter</b-btn
    >

    <b-table
      striped
      hover
      :items="utilisateurs"
      :fields="fields"
      empty-text="Aucun élément"
      show-empty
    >
      <template #cell(actions)="{ item }">
        <b-btn
          class="mr-2"
          variant="primary"
          @click="showModalModifierUtilisateur(item)"
          >Modifier</b-btn
        >
        <b-btn variant="danger" @click="supprimerUtilisateur(item)"
          >Supprimer</b-btn
        >
      </template>
    </b-table>

    <b-modal ref="modalEditUtilisateur" hide-footer>
      <ValidationObserver ref="form">
        <form @submit.prevent="onSubmit">
          <ValidationProvider
            name="Username"
            rules="required"
            v-slot="{ errors, valid }"
          >
            <b-form-group
              label="Nom d'utilisateur :"
              :state="valid"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                type="text"
                v-model="form.username"
                :state="valid"
              ></b-form-input>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Password"
            rules="required"
            v-slot="{ errors, valid }"
          >
            <b-form-group
              label="Mot de passe :"
              :state="valid"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                type="text"
                v-model="form.password"
                :state="valid"
              ></b-form-input>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="E-mail"
            rules="required|email"
            v-slot="{ errors, valid }"
          >
            <b-form-group
              label="Email :"
              :state="valid"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                type="email"
                v-model="form.email"
                :state="valid"
              ></b-form-input>
            </b-form-group>
          </ValidationProvider>

          <b-btn class="mr-2" @click="$refs.modalEditUtilisateur.hide()"
            >Fermer</b-btn
          >
          <b-btn variant="primary" type="submit">Envoyer</b-btn>
        </form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

import TableauUtilisateurs from "@/components/TableauUtilisateurs.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  name: "Home",

  components: {
    HelloWorld,
    TableauUtilisateurs,
  },

  created() {
    this.initPage();
  },

  data() {
    return {
      utilisateurs: [],
      fields: ["username", "email", "actions"],
      form: {},
    };
  },

  methods: {
    initPage() {
      this.axios
        .get("/utilisateurs")
        .then((res) => (this.utilisateurs = res.data))
        .catch((err) => console.error(err));
    },

    resetForm() {
      this.form = {};
    },

    onSubmit() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return alert("Formulaire incomplet veuillez recommencer !");
        }

        if (this.form.id != null) {
          // Modification
          this.axios
            .put("/utilisateurs/" + this.form.id, this.form)
            .then((res) => {
              this.$bvModal.msgBoxOk("Formulaire envoyé avec succès !");

              //reset du formulaire
              this.resetForm();
              this.initPage();

              // rafraichissement
              this.$refs.form.reset();
              this.$refs.modalEditUtilisateur.hide();
            })
            .catch((err) => {
              this.$bvModal.msgBoxOk(
                `Une erreur s'est produite lors de l'envoi du formulaire`
              );
            });
        } else {
          // Ajout
          this.axios
            .post("/utilisateurs", this.form)
            .then((res) => {
              this.$bvModal.msgBoxOk("Formulaire envoyé avec succès !");

              //reset du formulaire
              this.resetForm();
              this.initPage();

              // rafraichissement
              this.$refs.form.reset();
              this.$refs.modalEditUtilisateur.hide();
            })
            .catch((err) => {
              this.$bvModal.msgBoxOk(
                `Une erreur s'est produite lors de l'envoi du formulaire`
              );
            });
        }
      });
    },

    showModalAjoutUtilisateur() {
      this.form = {};
      this.$refs.modalEditUtilisateur.show();
    },

    showModalModifierUtilisateur(item) {
      this.form = item;
      this.$refs.modalEditUtilisateur.show();
    },

    supprimerUtilisateur(item) {
      this.$bvModal.msgBoxConfirm("Etes vous sur ?").then((confirm) => {
        if (confirm) {
          this.axios
            .delete("/utilisateurs/" + item.id)
            .then((res) => {
              this.initPage();
              this.$bvModal.msgBoxOk("Utilisateur supprimé avec succès");
            })
            .catch((err) => {
              this.$bvModal.msgBoxOk("Erreur lors de la suppression");
            });
        }
      });
    },
  },
};
</script>
