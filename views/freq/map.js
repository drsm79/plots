function(doc) {
  if (doc.freq) {
	  emit(doc._id, {'x': doc.size, 'y': doc.freq});
	}
}