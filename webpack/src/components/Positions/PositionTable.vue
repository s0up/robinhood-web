<template>
<table class='positions table table-hover table-condensed'>
  <thead>
    <th>Stock</th>
    <th>Num Shares</th>
    <th>Avg Buy Price</th>
    <th>Ask Price</th>
    <th>Last Trade Price</th>
    <th>Current Total Value</th>
    <th>ROI</th>
    <th>Held Since</th>
  </thead>
  <tbody>
    <slot name="position-table-body"></slot>
  </tbody>
</table>
</template>
