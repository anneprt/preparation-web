<template>
  <div>
    <table style="width: 100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOM D'UTILISATEUR</th>
          <th>MOT DE PASSE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="utilisateur in utilisateurs" :key="utilisateur.id">
          <td>{{ utilisateur.id }}</td>
          <td>{{ utilisateur.username }}</td>
          <td>{{ utilisateur.password }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    utilisateurs: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="scss" scoped>
</style>