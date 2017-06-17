import { ComponentFixture, async } from "@angular/core/testing";
import { TestUtils } from "../../test";
import { Snap } from "./snap";

let fixture: ComponentFixture<Snap> = null;
let instance: any = null;

describe("Snap", () => {
  beforeEach(
    async(() =>
      TestUtils.beforeEachCompiler([Snap]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
        fixture.detectChanges();
      })
    )
  );

  afterEach(() => {
    fixture.destroy();
  });

  /*it("initialises", () => {
    expect(instance).toBeTruthy();
  });*/

  /*it("does a click on tookSnap", () => {
    fixture.detectChanges();
    spyOn(instance["snap"], "takePicture");
    TestUtils.eventFire(fixture.nativeElement.querySelectorAll("#takeSnap")[0], "click");
    expect(instance["snap"].takePicture).toHaveBeenCalled();
  });*/
});
