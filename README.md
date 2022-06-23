# Smart View

Advanced automatic layout generator for better graph visualization.

## Getting Started

You can pass relationship paths as input to generate advanced views. A relationship path
can be represented as an array of elements, where the leftest (first) element is considered the 
main element. The subsequent elements form a relationship chain with the main element. An example
of a relationship chain is presented below:

```
(Customer)->(Product)<-(Supplier)
```

The situation presented could be translated as:

```
[Customer, Product, Supplier]
```

For proper rendering, additional information are required when describing
an element in the relationship chain. Elements must be described as follows:

```
{
    identifier: string; // Optional - Represents the element id
    name: string;
    type: string;
}
```

### Generating a View from Paths

Define the paths to be processed, in this case a simple example is provided:

```
const paths = [
  [
    {
      "identifier": "2cdb720a",
      "name": "A",
      "type": "businessactor"
    },
    {
      "identifier": "46f5e647",
      "name": "B",
      "type": "businessprocess"
    }
  ],
  [
    {
      "identifier": "2cdb720a",
      "name": "A",
      "type": "businessactor"
    },
    {
      "identifier": "46f5e646",
      "name": "C",
      "type": "businessprocess"
    }
  ]
];
```

Create and set up the engine by passing a Settings object.

```
const layoutSettings = new Settings({
    layoutType: "nested",
    spaceBetween: 2
});
  
let smartView = new SmartViewEngine(layoutSettings);
```

Generate a View description from your paths.

```
const view = smartView.generateView(paths, "View Name");
```

The result is a View description containing View Nodes and Relationships with
proper Width, Height and Position to be drawn using a drawing tool from your
preference.

> You can use [archimate-diagram-engine](https://www.npmjs.com/package/@arktect-co/archimate-diagram-engine) to 
> render Archimate views using JointJS

