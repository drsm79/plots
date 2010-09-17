function(head, req) {
  var row;
  var data = [];
  // height is actually ignored in the plotting code, since the circle is a circle
  var width = req.query.width || req.query.height || 400;
  var title = req.query.title || 'My Data';
  start({
    "headers": {
      "Content-Type": "text/html"
     }
  });
  // build up the data in memory
  while(row = getRow()) {
    data.push(row.value);
  }
  
  send('<!DOCTYPE html>\n');
  send('<html>\n');
  send('  <head>\n');
  send('    <title>Plots CouchApp : ' + title + '</title>\n');
  send('    <link rel="stylesheet" href="../../style/main.css" type="text/css">\n');
  send('    <script type="text/javascript" src="../../vendor/protovis/protovis-r3.2.js"></script>\n');
  send('  </head>\n');
  send('    <body>\n');
  send('    <div id="data"><h1>' + title + '</h1></div>\n');
  send('    </body>\n');
  send('    <script type="text/javascript">\n');
  send('  var data = [' + data + '];\n');
  send('  var w = ' + width + ',\n');
  send('      h = ' + width + ',\n');
  send('      r = w / 2,\n');
  send('      a = pv.Scale.linear(0, pv.sum(data)).range(0, 2 * Math.PI);\n');
  send('  var vis = new pv.Panel()\n');
  send('      .width(w)\n');
  send('      .height(w);\n');
  send('  vis.add(pv.Wedge)\n');
  send('      .data(data.sort(pv.reverseOrder))\n');
  send('      .bottom(w / 2)\n');
  send('      .left(w / 2)\n\n');
  send('      .innerRadius(r - 40)\n');
  send('      .outerRadius(r)\n');
  send('      .angle(a)\n');
  send('      .event("mouseover", function() this.innerRadius(0))\n');
  send('      .event("mouseout", function() this.innerRadius(r - 40))\n');
  send('    .anchor("center").add(pv.Label)\n');
  send('      .visible(function(d) d > .15)\n');
  send('      .textAngle(0)\n');
  send('      .text(function(d) d.toFixed(2));\n');
  send('  vis.render();\n');
  send('  </script>\n');  
  send('</html>\n');
}