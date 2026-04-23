using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace contacts_api.Migrations
{
    /// <inheritdoc />
    public partial class AddPrimaryAndFavouriteIds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFavorite",
                table: "Contacts",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PrimaryAddressId",
                table: "Contacts",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PrimaryPhoneNumberId",
                table: "Contacts",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFavorite",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "PrimaryAddressId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "PrimaryPhoneNumberId",
                table: "Contacts");
        }
    }
}
