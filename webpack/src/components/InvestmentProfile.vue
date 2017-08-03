<template>
  <div class='row'>
    <div class='col-md-12'>
      <h3>Investment Profile for {{userData.first_name}}  {{userData.last_name}}</h3>
    </div>
    <div class='col-md-6' v-if="loaded">
      <table class='positions table table-hover'>
        <tbody>
        <tr>
          <th scope="row">Annual Income Bracket</th>
          <td>${{investmentProfile.annual_income.replace("_", "-")}}</td>
        </tr>
        <tr>
          <th scope="row">Total Net Worth Bracket</th>
          <td>${{investmentProfile.total_net_worth.replace("_", "-")}}</td>
        </tr>
        <tr>
          <th scope="row">Liquid Net Worth Bracket</th>
          <td>${{investmentProfile.liquid_net_worth.replace("_", "-")}}</td>
        </tr>
        <tr>
          <th scope="row">Source of Funds</th>
          <td>{{investmentProfile.source_of_funds.replace(/_/g, " ")}}</td>
        </tr>
        <tr>
          <th scope="row">Risk Tolerance</th>
          <td>{{investmentProfile.risk_tolerance.replace(/_/g, " ")}}</td>
        </tr>
        <tr>
          <th scope="row">Investment Experience</th>
          <td>{{(investmentProfile.investment_experience.replace(/_/g, " ")).replace("exp", "experience")}}</td>
        </tr>
        <tr v-if="investmentProfile.tax_bracket != '' && investmentProfile.tax_bracket != null">
          <th scope="row">Tax Bracket</th>
          <td>{{investmentProfile.tax_bracket}}</td>
        </tr>
        <tr>
          <th scope="row">Investment Time Horizon</th>
          <td>{{investmentProfile.time_horizon.replace(/_/g, " ")}}</td>
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
      if (!this.loaded)
        robinhood.getResource(this.userData.investment_profile);
    },
    computed: {
      userData: function () {
        return state.getters.userData;
      },
      loaded: function () {
        return (this.investmentProfile != null);
      },
      investmentProfile: function () {
        return state.getters.resource(this.userData.investment_profile);
      }
    }
  }
</script>
