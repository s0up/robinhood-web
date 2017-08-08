<template>
  <div class='banking'>
    <ul class="nav nav-tabs nav-justified">
      <li role="presentation" class="active"><a href="#">Money to Robinhood</a></li>
      <li role="presentation"><a href="#">Money to Bank</a></li>
    </ul>
    <p>&nbsp;</p>
    <p class="lead"> Transfer to Robinhood </p>
    <form class="form-horizontal">
      <div class="form-group">
        <div class="col-sm-2">
        <label for="moneyDeposit" class="control-label text-right">Amount to deposit:</label>
        </div>
        <div class="col-sm-9">
          <div class="input-group">
            <span class="input-group-addon">$</span>
            <input type="text" class="form-control" id="moneyDeposit" placeholder="100">
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
  </form>
    <h1 class="display-3 text-center">Coming soon</h1>
    <p class="lead text-center text-danger">Someone should build this page for me :)</p>
    <p>The API calls have been added for automatic and manual ACH transfers</p>
  </div>
</template>
<script>
import robinhood from '@/api/robinhood';
import state from '@/state';

export default {
  created(){
    robinhood.getAccounts();
    robinhood.getACHTransfers();
    robinhood.getAutomaticACHTransfers();
  },
  computed: {
    ACHTransfers(){
      return state.getters.ACHTransfers;
    },
    automaticACHTransfers(){
      return state.getters.automaticACHTransfers;
    },
    accounts(){
      return state.getters.accounts;
    },
    currentAccount(){
      return state.getters.currentAccount;
    }
  }
}
</script>
