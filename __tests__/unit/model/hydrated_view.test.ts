import { HydratedView } from "../../../src/libs/model/hydrated_view";
import { HydratedViewNode, ViewNode } from "../../../src/libs/model/view_node";
import { DEFAULT } from "../../../src/libs/common/size_reference.const";

describe("Hydrated View", () => {
  let view = null;

  it("Should create a Hydrated View", (done) => {
    view = new HydratedView("1", "Test");

    expect(view).toBeDefined();

    done();
  });

  it("Should get Id value", (done) => {
    expect(view.getId()).toBe("1");

    done();
  });

  it("Should get Name value", (done) => {
    expect(view.getName()).toBe("Test");

    done();
  });

  it("Should create and add a node with all values set", (done) => {
    const node: HydratedViewNode = view.createViewNode(
      "1",
      "2",
      "Node 1",
      "T1",
      0,
      0,
      "0",
      100,
      50
    );
    view.addViewNode(node);

    const insertedNode: HydratedViewNode = view.getViewNode("2");

    expect(view.getViewNodesCount()).toBe(1);
    expect(insertedNode).toBeDefined();
    expect(insertedNode.modelNodeId).toBe("1");
    expect(insertedNode.viewNodeId).toBe("2");
    expect(insertedNode.name).toBe("Node 1");
    expect(insertedNode.type).toBe("T1");
    expect(insertedNode.x).toBe(0);
    expect(insertedNode.y).toBe(0);
    expect(insertedNode.parentId).toBe("0");
    expect(insertedNode.width).toBe(100);
    expect(insertedNode.height).toBe(50);

    done();
  });

  it("Should create and add a node with partial values", (done) => {
    const node: HydratedViewNode = view.createViewNode(
      "2",
      "3",
      "Node 2",
      "T2"
    );
    view.addViewNode(node);

    const insertedNode: HydratedViewNode = view.getViewNode("3");

    expect(view.getViewNodesCount()).toBe(2);
    expect(insertedNode).toBeDefined();
    expect(insertedNode.modelNodeId).toBe("2");
    expect(insertedNode.viewNodeId).toBe("3");
    expect(insertedNode.name).toBe("Node 2");
    expect(insertedNode.type).toBe("T2");
    expect(insertedNode.x).toBe(0);
    expect(insertedNode.y).toBe(0);
    expect(insertedNode.parentId).toBe(null);
    expect(insertedNode.width).toBe(DEFAULT.DEFAULT_WIDTH);
    expect(insertedNode.height).toBe(DEFAULT.DEFAULT_HEIGHT);

    done();
  });

  it("Should create, add and nest a node", (done) => {
    const node: HydratedViewNode = view.createViewNode(
      "3",
      "4",
      "Node 3",
      "T3"
    );
    view.addViewNode(node);

    view.nestViewNode(view.getViewNode("2"), node);

    const insertedNode: HydratedViewNode = view.getViewNode("4");
    const parentChildren = view.getViewNodeChildren("2");

    expect(view.getViewNodesCount()).toBe(3);
    expect(insertedNode).toBeDefined();
    expect(insertedNode.modelNodeId).toBe("3");
    expect(insertedNode.viewNodeId).toBe("4");
    expect(insertedNode.name).toBe("Node 3");
    expect(insertedNode.type).toBe("T3");
    expect(insertedNode.x).toBe(0);
    expect(insertedNode.y).toBe(0);
    expect(insertedNode.parentId).toBe("2");
    expect(insertedNode.width).toBe(DEFAULT.DEFAULT_WIDTH);
    expect(insertedNode.height).toBe(DEFAULT.DEFAULT_HEIGHT);

    expect(parentChildren.length).toBe(1);
    expect(parentChildren[0].name).toBe("Node 3");

    done();
  });

  it("Should create, add and nest a second child", (done) => {
    const node: HydratedViewNode = view.createViewNode(
      "4",
      "5",
      "Node 4",
      "T4"
    );
    view.addViewNode(node);

    view.nestViewNode(view.getViewNode("2"), node);

    const insertedNode: HydratedViewNode = view.getViewNode("5");
    const parentChildren = view.getViewNodeChildren("2");

    expect(view.getViewNodesCount()).toBe(4);
    expect(insertedNode).toBeDefined();
    expect(insertedNode.modelNodeId).toBe("4");
    expect(insertedNode.viewNodeId).toBe("5");
    expect(insertedNode.name).toBe("Node 4");
    expect(insertedNode.type).toBe("T4");
    expect(insertedNode.x).toBe(0);
    expect(insertedNode.y).toBe(0);
    expect(insertedNode.parentId).toBe("2");
    expect(insertedNode.width).toBe(DEFAULT.DEFAULT_WIDTH);
    expect(insertedNode.height).toBe(DEFAULT.DEFAULT_HEIGHT);

    expect(parentChildren.length).toBe(2);
    expect(parentChildren[1].name).toBe("Node 4");

    done();
  });

  it("Should copy a View Node and its Children", (done) => {
    const node: HydratedViewNode = view.copyViewNodeAndItsChildren(
      view.getViewNode("2")
    );
    const children = view.getViewNodeChildren("2");

    expect(view.getViewNodesCount()).toBe(7);
    expect(node).toBeDefined();
    expect(node.modelNodeId).toBe("1");
    expect(node.viewNodeId).toBe("2_2");
    expect(node.name).toBe("Node 1");
    expect(node.type).toBe("T1");
    expect(node.x).toBe(0);
    expect(node.y).toBe(0);
    expect(node.parentId).toBe("0");
    expect(node.width).toBe(100);
    expect(node.height).toBe(50);

    expect(children.length).toBe(2);
    expect(children[0].name).toBe("Node 3");
    expect(children[1].name).toBe("Node 4");

    done();
  });

  it("Should clear parent ids that doesn't exist", (done) => {
    view.clear();

    const node = view.getViewNode("2");

    expect(node).toBeDefined();
    expect(node.parentId).toBeNull();

    done();
  });
});
