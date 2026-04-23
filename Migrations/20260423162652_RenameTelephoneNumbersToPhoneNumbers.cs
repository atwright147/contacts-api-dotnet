using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace contacts_api.Migrations
{
    /// <inheritdoc />
    public partial class RenameTelephoneNumbersToPhoneNumbers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TelephoneNumbers_Contacts_ContactId",
                table: "TelephoneNumbers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TelephoneNumbers",
                table: "TelephoneNumbers");

            migrationBuilder.RenameTable(
                name: "TelephoneNumbers",
                newName: "PhoneNumbers");

            migrationBuilder.RenameIndex(
                name: "IX_TelephoneNumbers_ContactId",
                table: "PhoneNumbers",
                newName: "IX_PhoneNumbers_ContactId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PhoneNumbers",
                table: "PhoneNumbers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PhoneNumbers_Contacts_ContactId",
                table: "PhoneNumbers",
                column: "ContactId",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PhoneNumbers_Contacts_ContactId",
                table: "PhoneNumbers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PhoneNumbers",
                table: "PhoneNumbers");

            migrationBuilder.RenameTable(
                name: "PhoneNumbers",
                newName: "TelephoneNumbers");

            migrationBuilder.RenameIndex(
                name: "IX_PhoneNumbers_ContactId",
                table: "TelephoneNumbers",
                newName: "IX_TelephoneNumbers_ContactId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TelephoneNumbers",
                table: "TelephoneNumbers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TelephoneNumbers_Contacts_ContactId",
                table: "TelephoneNumbers",
                column: "ContactId",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
