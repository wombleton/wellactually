/* globals _ */
function getFactoid(tmpl) {
  var vals = $(tmpl.findAll('[type=text], textarea, [type=radio]:checked')).serializeArray();

  return _.reduce(vals, function(memo, val) {
    memo[val.name] = val.value;

    return memo;
  }, {});
}

function validate(e, tmpl) {
  var submit = $(tmpl.find('[type=submit]')),
      factoid = getFactoid(tmpl),
      valid = true;

  valid = valid && updateError(tmpl, 'claim', factoid.claim.length > 0 && factoid.claim.length <= 200);
  valid = valid && updateError(tmpl, 'summary', factoid.summary.length > 0 && factoid.summary.length <= 200);
  valid = valid && updateError(tmpl, 'discussion', factoid.discussion.length > 0 && factoid.discussion.length <= 5000);
  valid = valid && updateError(tmpl, 'verdict', _.contains(['true', 'partial', 'false'], factoid.verdict));

  if (valid) {
    submit.removeAttr('disabled');
  } else {
    submit.attr('disabled', 'disabled');
  }
}

function updateError(tmpl, name, valid) {
  var el = $(tmpl.find('[name=' + name + ']')).parents('.form-group');

  el.toggleClass('has-error', !valid);
  el.find('.help-block').toggleClass('hidden', valid);

  return valid;
}

Template.createfactoid.events = {
  'input': _.debounce(validate, 100),
  'click label.btn': _.debounce(validate, 100)
};
