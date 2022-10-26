# Neo4jConnector

## Brief

​	Neo4jConnector,aim to create a tool to simplify the process of usual neo4j operation and focus on your work.

## Usage

1. reference Neo4jConnector.js in your html like:

```html
<script src="./Neo4jConnector.js">
```

2. initialize Neo4jConnector

```html
a = new Connector("bolt://localhost:7687","neo4j","123456")
```

3. connect to your database

```html
a.initSession("your_database_name")
```

## Basic Function

1. initNode()

> return a node object ,format is

```
node = {
			name:'',
			labels:[
				{
                    name:'',
                    properties:{
                    name:value
                    }
				}
			]
			
};
```

2. addNodes()

> Params:[node1,node2...],add nodes to neo4j database,use like this:

```js
a.addNodes([node,node]).then(()=>{console.log("success")});
```

## Notes

This is a project in start-up phase



If you also interest in neo4j ,Data science, Welcome to discuss at:

> Telegram https://t.me/+IyqE6UoFisM5ZTg1
>
> QQ:762039266

I'm lonely. Who will chat with me.😥