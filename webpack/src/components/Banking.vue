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
        <label for="moneyDeposit" class="col-sm-2 control-label">Amount to deposit:</label>
        <div class="col-sm-10">
          <span class="input-group-addon">$</span>
          <input type="text" class="form-control" id="moneyDeposit" placeholder="100">
        </div>
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
  </form>
    <h1 class="display-3 text-center">Coming soon</h1>
    <p class="lead text-center text-danger">Someone should build this page for me :)</p>
    <p>The API calls have been added for automatic and manual ACH transfers</p>
  </div>
</template>
