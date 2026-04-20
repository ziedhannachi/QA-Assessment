const { I } = inject();

class OfferSearchFragment {
  // locators
  searchInput = '[data-qa="search-input"]';
  searchResults = "//sports-search-page";

  noResultIcon = '//div[@class="errorPage_headerImg"]';
  noResultTextTitle = '//div[normalize-space()="Pas de résultat"]';
  noResultTextDescription = '//div[normalize-space()="Aucun joueur, match ou compétition trouvé. Vérifie ta saisie ou essaie une autre recherche."]';

  // methods

  public async typeInTheSearch(input: string): Promise<void> {
    await I.fillField(this.searchInput, input);
   /* await I.waitForResponse(
      (response) =>
        response.status() === 200 &&
        response
          .url()
          .includes("https://offer.cdn.begmedia.com/api/pub/v4/events"),
      10
    );*/
  }

  public async validateNoContent(dataTable: any): Promise<void> {
    const currentTextTitle = await I.grabTextFrom(this.noResultTextTitle);
    const expectedTitle = dataTable.parse().hashes()[0].expectedTitle;
    const currentTextDescription = await I.grabTextFrom(
      this.noResultTextDescription
    );
    const expectedDescription = dataTable
      .parse()
      .hashes()[0].expectedDescription;

    I.assertContain(currentTextTitle, expectedTitle);
    I.assertContain(currentTextDescription, expectedDescription);
  }

   public async validateAtLeastOneResult(): Promise<void> {
    I.waitForVisible(this.searchResults, 10);
    const numberOfResults = await I.grabNumberOfVisibleElements(this.searchResults);
    I.assertAbove(numberOfResults, 0);
  }
}

export = new OfferSearchFragment();
