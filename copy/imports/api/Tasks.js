import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

Meteor.methods({
	'copyToclipboard': function() {

		var url = '';
		var token = Random.secret();
		url = 'https://abc.com/user/'+ token;
		return url;
	}
});