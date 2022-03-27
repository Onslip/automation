const { getVersionMessage } = require('@changesets/cli/commit')['default'];

exports.getAddMessage = (changeset) => changeset.summary;
exports.getVersionMessage = getVersionMessage;
