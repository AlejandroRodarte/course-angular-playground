import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    // event emitter to send the section we want to display
    @Output()
    sectionToDisplay = new EventEmitter<{ section: string }>();

    // when clicking 'recipes' on the header, send an object with the section to display (recipes section)
    onRecipesClick(): void {
        this.sectionToDisplay.emit({ section: 'recipes' });
    }

    // when clicking 'shopping list' on the header, send an object with the section to display (shopping list section)
    onShoppingListClick(): void {
        this.sectionToDisplay.emit({ section: 'shoppingList' });
    }


}