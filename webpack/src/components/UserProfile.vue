<template>
  <div class='row'>
    <div class='col-md-12'>
      <h3>User Profile</h3>
    </div>
    <div class='col-md-6' v-if="loaded">
      <table class='positions table table-hover'>
        <tbody>
        <tr>
          <th scope="row">User Name</th>
          <td>{{userData.username}}</td>
        </tr>
        <tr>
          <th scope="row">Full Name</th>
          <td>{{userData.first_name}}  {{userData.last_name}}</td>
        </tr>
        <tr>
          <th scope="row">Email</th>
          <td>{{userData.email}}</td>
        </tr>
        <tr>
          <th scope="row">Phone Number</th>
          <td>{{basicInfo.phone_number}}</td>
        </tr>
        <tr>
          <th scope="row">Street Address</th>
          <td>{{basicInfo.address}}</td>
        </tr>
        <tr>
          <th scope="row">City</th>
          <td>{{basicInfo.city}}</td>
        </tr>
        <tr>
          <th scope="row">State</th>
          <td>{{basicInfo.state}}</td>
        </tr>
        <tr>
          <th scope="row">Zipcode</th>
          <td>{{basicInfo.zipcode}}</td>
        </tr>
        <tr>
          <th scope="row">Country</th>
          <td>{{basicInfo.country_of_residence}}</td>
        </tr>
        <tr>
          <th scope="row">Date of Birth</th>
          <td>{{basicInfo.date_of_birth}}</td>
        </tr>
        <tr>
          <th scope="row">Number of Dependents</th>
          <td>{{basicInfo.number_dependents}}</td>
        </tr>
        <tr>
          <th scope="row">Marital Status</th>
          <td>{{basicInfo.marital_status}}</td>
        </tr>
        <tr>
          <th scope="row">Citizenship</th>
          <td>{{basicInfo.citizenship}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import state from '@/state';
  import robinhood from '@/api/robinhood';

  export default {
    created() {
      if (!this.loaded){
        robinhood.getResource("https://api.robinhood.com/user/");
        robinhood.getResource("https://api.robinhood.com/user/basic_info/");
        robinhood.getResource("https://api.robinhood.com/user/additional_info/");
      }
    },
    data(){
      return {}
    },
    computed: {
      userData(){
        return state.getters.resource("https://api.robinhood.com/user/");
      },
      basicInfo(){
        return state.getters.resource("https://api.robinhood.com/user/basic_info/");
      },
      additionalInfo(){
        return state.getters.resource("https://api.robinhood.com/user/additional_info/");
      },
      loaded: function () {
        return (typeof this.basicInfo !== 'undefined' && this.basicInfo != null);
      }
    }
  }
</script>
