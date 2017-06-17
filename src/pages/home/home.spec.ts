import { ComponentFixture, async } from "@angular/core/testing";
import { TestUtils } from "../../test";
import { HomePage } from "./home";

let fixture: ComponentFixture<HomePage> = null;
let instance: any = null;

describe("HomePage", () => {
  beforeEach(
    async(() =>
      TestUtils.beforeEachCompiler([HomePage]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
        fixture.detectChanges();
      })
    )
  );

  afterEach(() => {
    fixture.destroy();
  });

  it("initialises", () => {
    expect(instance).toBeTruthy();
  });

  it("verify the connexion button", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll("button span")[0].innerHTML).toEqual("Connexion");
  });

  it("verify the signup button", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll("button span")[1].innerHTML).toEqual("Inscription");
  });
});
