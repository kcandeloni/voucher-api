import { jest } from "@jest/globals";
import voucherService from "services/voucherService";
import voucherRepository from "repositories/voucherRepository";

describe("Reject Voucher Creation", () => {
  it("Try to create an existing voucher", async () => {
    jest
    .spyOn(voucherRepository, "getVoucherByCode")
    .mockImplementationOnce((): any => {
      return true;
    });

    const promise = voucherService.createVoucher("newvoucher", 10);
    expect(promise).rejects.toEqual({message: "Voucher already exist.", type: "conflict"});
  });

});

describe("Create Voucher", () => {
  it("Create new voucer", () => {
    expect( async () => {
        jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {
        return false;
      });

      jest
      .spyOn(voucherRepository, "createVoucher")
      .mockImplementationOnce((): any => {
        return;
      });

      await voucherService.createVoucher("newvoucher", 10);
    }).not.toEqual({message: "Voucher already exist.", type: "conflict"});
  });

});