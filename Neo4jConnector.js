
(function (){
	
	
document.write('<script src="https://unpkg.com/neo4j-driver@5.1.0/lib/browser/neo4j-web.js" type="text/javascript" charset="utf-8"></script>');
	class Neo4jConnector{
	
	constructor(url,name,password){
		this.url = url;
		this.name = name;
		this.password = password;
		this.driver = neo4j.driver(url, neo4j.auth.basic(name, password));
		this.eventType = {
			addNodesFinish:"Neo4jConnectoraddNodesFinish"
		};
		//Promise.prototype._this = this;
	}
	
	initSession(database){
		this.session = this.driver.session({database:database});
	}
	
	addNodes(nodes){
		return new Promise((resolve,reject)=>{
				let _this = this;
				(async function(resolve,reject){
				for(let i = 0 ; i<nodes.length;i++){
					let cypherString = 'CREATE(';
					node = nodes[i];
				
					
					cypherString += node.name;
					for(let j = 0 ; j < node.labels.length;j++){
						label = labels[j];
					
						cypherString += ':';
						cypherString+=label.name;
						cypherString+='{';
						Object.keys(label.properties).forEach((prop,idx)=>{
							cypherString+=prop;
							cypherString+=':';
							cypherString+=label.properties[prop];
							label.properties.keys().length == idx ? null:cypherString+=','
						});
						cypherString+='}';
					
					}
					cypherString+=")";
					await _this.session.run(cypherString)._getOrCreatePromise();

				}
			resolve();
			})(resolve,reject);
		});
	}
	
	delNodes(nodes){
		let cypherString = 'MATCH(';
		nodes.forEach((node)=>{
			
			cypherString += node.name;
			node.labels.forEach((label)=>{
				cypherString += ':';
				cypherString+=label.name;
				cypherString+='{';
				Object.keys(label.properties).forEach((prop,idx)=>{
					cypherString+=prop;
					cypherString+=':';
					cypherString+=label.properties[prop];
					label.properties.keys().length == idx ? null:cypherString+=','
				});
				cypherString+='}';
			});
			cypherString+=") DETACH DELETE ";
			cypherString += node.name;
			this.session.run(cypherString).then(()=>{
				window.dispatchEvent(Event(this.eventType.addNodesFinish));
			});
		});
	}
	
	addRelationships(node1,relationships,node2){
		let cypherString = 'MATCH(';
		
			
		cypherString += node1.name;
		node1.labels.forEach((label)=>{
			cypherString += ':';
			cypherString+=label.name;
			cypherString+='{';
			Object.keys(label.properties).forEach((prop,idx)=>{
				cypherString+=prop;
				cypherString+=':';
				cypherString+=label.properties[prop];
				label.properties.keys().length == idx ? null:cypherString+=','
			});
			cypherString+='}';
		});
		
		cypherString+=",";
		
		cypherString += node2.name;
		node2.labels.forEach((label)=>{
			cypherString += ':';
			cypherString+=label.name;
			cypherString+='{';
			Object.keys(label.properties).forEach((prop,idx)=>{
				cypherString+=prop;
				cypherString+=':';
				cypherString+=label.properties[prop];
				label.properties.keys().length == idx ? null:cypherString+=','
			});
			cypherString+='}';
		});
		
		
		
		cypherString+=") ";
		
		cypherString+= 'CREATE(';
		
			
			cypherString += node1.name;
			cypherString +=")-[";
			relationships.forEach((node)=>{
				node.labels.forEach((label)=>{
					cypherString += ':';
					cypherString+=label.name;
					cypherString+='{';
					Object.keys(label.properties).forEach((prop,idx)=>{
						cypherString+=prop;
						cypherString+=':';
						cypherString+=label.properties[prop];
						label.properties.keys().length == idx ? null:cypherString+=','
					});
					cypherString+='}';
				});
			});
		cypherString+="]-";
		cypherString+=node2.name;
			
		
		
		
		this.session.run(cypherString).then(()=>{
			window.dispatchEvent(Event(this.eventType.addNodesFinish));
		});
		
	}
	
	initNode(){
		let node = {
			name:'',
			labels:[
			//{
				//name:'',
				//properties:{
				//name:value
			//}
			//}
			]
			
		};
		
		return node;
	}
	
	initRelationship(){
		let relationship = {
			name:'',
			lables:[
			//{
				//name:'',
				//properties:{
				//name:value
			//}
			//}
			]
		};
		
		return relationship;
	}
	
}

this.Connector = Neo4jConnector;
})();
