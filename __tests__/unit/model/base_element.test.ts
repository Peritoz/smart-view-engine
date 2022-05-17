import { BaseElement } from "../../../src/libs/model/base_element";

describe("Base Element", () => {
  let baseElement = null;

  it("Should create a Base Element", (done) => {
    baseElement = new BaseElement({
      name: "A",
      type: "T1",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      parentId: null,
    });

    expect(baseElement).toBeDefined();

    done();
  });

  it("Should get Id value", (done) => {
    const id = baseElement.getId();

    expect(id).toBeDefined();
    expect(id).not.toBe("");
    expect(typeof id).toBe("string");

    done();
  });

  it("Should get Name value", (done) => {
    expect(baseElement.getName()).toBe("A");

    done();
  });

  it("Should get Type value", (done) => {
    expect(baseElement.getType()).toBe("T1");

    done();
  });

  it("Should set and get X value", (done) => {
    baseElement.setX(10);

    expect(baseElement.getX()).toBe(10);

    done();
  });

  it("Should set and get Y value", (done) => {
    baseElement.setY(20);

    expect(baseElement.getY()).toBe(20);

    done();
  });

  it("Should set and get Width value", (done) => {
    baseElement.setWidth(200);

    expect(baseElement.getWidth()).toBe(200);

    done();
  });

  it("Should get error when setting negative Width", (done) => {
    expect(() => {
      baseElement.setWidth(-10);
    }).toThrow("Width cannot be nagative");

    done();
  });

  it("Should set and get Height value", (done) => {
    baseElement.setHeight(100);

    expect(baseElement.getHeight()).toBe(100);

    done();
  });

  it("Should get error when setting negative Height", (done) => {
    expect(() => {
      baseElement.setHeight(-10);
    }).toThrow("Height cannot be nagative");

    done();
  });

  it("Should set and get ParentId value", (done) => {
    baseElement.setParentId("1");

    expect(baseElement.getParentId()).toBe("1");

    done();
  });

  it("Should translate position - Positive Delta X and Delta Y", (done) => {
    baseElement.translatePosition(10,5);

    expect(baseElement.getX()).toBe(20);
    expect(baseElement.getY()).toBe(25);

    done();
  });

  it("Should translate position - Negative Delta X and Delta Y", (done) => {
    baseElement.translatePosition(-10,-5);

    expect(baseElement.getX()).toBe(10);
    expect(baseElement.getY()).toBe(20);

    done();
  });
});
