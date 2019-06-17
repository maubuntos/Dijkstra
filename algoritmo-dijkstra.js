//Prioridad de cola
function PriorityQueue () {
    this._nodes = [];
  
    this.enqueue = function (priority, key) {
      this._nodes.push({key: key, priority: priority });
      this.sort();
    };
    this.dequeue = function () {
      return this._nodes.shift().key;
    };
    this.sort = function () {
      this._nodes.sort(function (a, b) {
        return a.priority - b.priority;
      });
    };
    this.isEmpty = function () {
      return !this._nodes.length;
    };
  }
  
  /**
   * Comenzamos el algoritmo
   */
  function Graph(){
    var INFINITY = 1/0;
    this.vertices = {};
    
    //Aqui guardaremos los vertices del grafo
    this.addVertex = function(name, edges){
      this.vertices[name] = edges;
    };
  
    this.shortestPath = function (start, finish) {
      var nodes = new PriorityQueue(),
          distances = {},
          previous = {},
          path = [],
          smallest, vertex, neighbor, alt;
  
    //Algoritmo de relacion de vertices
      for(vertex in this.vertices) {
        if(vertex === start) {
          distances[vertex] = 0;
          nodes.enqueue(0, vertex);
        }
        else {
          distances[vertex] = INFINITY;
          nodes.enqueue(INFINITY, vertex);
        }
  
        previous[vertex] = null;
      }
  
      while(!nodes.isEmpty()) {
        smallest = nodes.dequeue();
  
        if(smallest === finish) {
          path = [];
  
          while(previous[smallest]) {
            path.push(smallest);
            smallest = previous[smallest];
          }
  
          break;
        }
        
        //la ruta mas corta

        if(!smallest || distances[smallest] === INFINITY){
          continue;
        }
  
        for(neighbor in this.vertices[smallest]) {
          alt = distances[smallest] + this.vertices[smallest][neighbor];
  
          if(alt < distances[neighbor]) {
            distances[neighbor] = alt;
            previous[neighbor] = smallest;
  
            nodes.enqueue(alt, neighbor);
          }
        }
      }
  
      return path;
    };
  }
  // Creacion del Grafo
  var g = new Graph();
  
  g.addVertex('A', {B: 7, C: 8});
  g.addVertex('B', {A: 7, F: 2});
  g.addVertex('C', {A: 8, F: 6, G: 4});
  g.addVertex('D', {F: 8});
  g.addVertex('E', {H: 1});
  g.addVertex('F', {B: 2, C: 6, D: 8, G: 9, H: 3});
  g.addVertex('G', {C: 4, F: 9});
  g.addVertex('H', {E: 1, F: 3});
  
  // Regresamos un log, con la adición de revertir la ruta y anteponer el primer nodo para ver en la consola
  console.log(g.shortestPath('A', 'H').concat(['A']).reverse());