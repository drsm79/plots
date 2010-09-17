function(doc) {
  if (doc.size) {
    emit(doc._id, doc.size);
  }
}