/*global Meteor, SchemaRegEx */
Factoids = new Meteor.Collection2('factoids', {
  schema: {
    claim: {
      type: String,
      label: 'Claim',
      max: 140,
      min: 1
    },
    discussion: {
      type: String,
      label: 'Discussion',
      min: 1,
      max: 2000
    },
    reference: {
      type: String,
      label: 'Reference',
      optional: true,
      max: 256
    },
    verdict: {
      allowedValues: ['true', 'partially true', 'false'],
      type: String,
      label: 'Verdict'
    },
    createdAt: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date();
        } else if (this.isUpsert) {
          return {
            $setOnInsert: new Date()
          };
        } else {
          this.unset();
        }
      },
      denyUpdate: true
    },
    // Force value to be current date (on server) upon update
    // and don't allow it to be set upon insert.
    updatedAt: {
      type: Date,
      autoValue: function() {
        if (this.isUpdate) {
          return new Date();
        }
      },
      denyInsert: true,
      optional: true
    },
    user: {
      type: String,
      autoValue: function() {
        if (this.isInsert) {
          return this.userId;
        } else if (this.isUpsert) {
          return {
            $setOnInsert: this.userId
          };
        } else {
          this.unset();
        }
      },
      denyUpdate: true
    }
  }
});
