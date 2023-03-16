import { jest } from "@jest/globals";
import voucherService from "services/voucherService";
import voucherRepository from "repositories/voucherRepository";

describe("Create Voucher", () => {
  it("Create new voucer", async () => {
    jest
    .spyOn(voucherRepository, "getVoucherByCode")
    .mockImplementationOnce((): any => {
      return true;
    });

    const promise = voucherService.createVoucher("newvoucher", 10);
    expect(promise).rejects.toEqual({message: "Voucher already exist.", type: "conflict"});
  });

});