import {
  ChevronDown,
  ChevronUp,
  Package,
  SlidersHorizontal,
  Star,
  Tag,
  Truck,
  X,
  RotateCcw,
  Check,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function ProductFiltersSidebar({
  categories = [],
  categoriesLoading = false,
  openSections = {
    categories: true,
    price: true,
    rating: true,
    brands: true,
    delivery: true,
  },
  toggleSection,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
  selectedBrands = [],
  toggleBrand,
  deliveryOption,
  setDeliveryOption,
  availableBrands = [],
  onClearAll,
}) {
  return (
    <div className="space-y-3.5">
      {/* Categories Filter */}
      <Collapsible
        open={openSections.categories}
        onOpenChange={() => toggleSection("categories")}
        className="border border-border/60 rounded-2xl overflow-hidden bg-card/60 backdrop-blur-sm transition-all duration-200 hover:border-border"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/40 transition-colors">
          <span className="text-sm font-semibold flex items-center gap-2.5 text-foreground">
            <Package className="w-4 h-4 text-amber-500" />
            Categories
          </span>
          {openSections.categories ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 pt-0">
          {categoriesLoading ? (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-7 w-16 bg-muted/60 rounded-full animate-pulse"
                />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <p className="text-xs text-muted-foreground pt-1">
              No categories available
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5 pt-1">
              <Badge
                variant={selectedCategory === "" ? "default" : "outline"}
                className={`cursor-pointer text-xs rounded-full px-3 py-1 transition-all ${
                  selectedCategory === ""
                    ? "bg-amber-400 text-slate-950 font-semibold hover:bg-amber-500 shadow-sm shadow-amber-500/10"
                    : "hover:border-amber-400/50 hover:text-amber-500"
                }`}
                onClick={() => setSelectedCategory("")}
              >
                All
              </Badge>
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className={`cursor-pointer text-xs rounded-full px-3 py-1 transition-all capitalize ${
                    selectedCategory === cat
                      ? "bg-amber-400 text-slate-950 font-semibold hover:bg-amber-500 shadow-sm shadow-amber-500/10"
                      : "hover:border-amber-400/50 hover:text-amber-500"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range Filter */}
      <Collapsible
        open={openSections.price}
        onOpenChange={() => toggleSection("price")}
        className="border border-border/60 rounded-2xl overflow-hidden bg-card/60 backdrop-blur-sm transition-all duration-200 hover:border-border"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/40 transition-colors">
          <span className="text-sm font-semibold flex items-center gap-2.5 text-foreground">
            <SlidersHorizontal className="w-4 h-4 text-amber-500" />
            Price Range
          </span>
          {openSections.price ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 pt-0">
          <div className="px-1 pt-2">
            <Slider
              value={priceRange}
              min={0}
              max={1000}
              step={10}
              onValueChange={setPriceRange}
              className="mb-3"
            />
            <div className="flex justify-between items-center text-xs font-medium text-foreground">
              <span className="px-2 py-1 bg-muted/60 rounded-lg border border-border/40">
                ${priceRange[0]}
              </span>
              <span className="text-xs text-muted-foreground">to</span>
              <span className="px-2 py-1 bg-muted/60 rounded-lg border border-border/40">
                ${priceRange[1]}
              </span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Star Rating Filter */}
      <Collapsible
        open={openSections.rating}
        onOpenChange={() => toggleSection("rating")}
        className="border border-border/60 rounded-2xl overflow-hidden bg-card/60 backdrop-blur-sm transition-all duration-200 hover:border-border"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/40 transition-colors">
          <span className="text-sm font-semibold flex items-center gap-2.5 text-foreground">
            <Star className="w-4 h-4 text-amber-500" />
            Star Rating
          </span>
          {openSections.rating ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 pt-0">
          <RadioGroup
            value={selectedRating.toString()}
            onValueChange={(val) => setSelectedRating(Number(val))}
            className="space-y-1 pt-1"
          >
            {[0, 4, 3, 2, 1].map((stars) => (
              <label
                key={stars}
                className="flex items-center justify-between p-1.5 rounded-xl text-sm cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <RadioGroupItem
                    value={stars.toString()}
                    id={`rating-${stars}`}
                    className="border-border/80 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="flex items-center gap-1 text-xs md:text-sm font-medium text-foreground">
                    {stars === 0 ? (
                      "All Ratings"
                    ) : (
                      <>
                        <span className="text-amber-500">{"★".repeat(stars)}</span>
                        <span className="text-muted-foreground/40">
                          {"★".repeat(5 - stars)}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">
                          & up
                        </span>
                      </>
                    )}
                  </span>
                </div>
              </label>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      {/* Brand Filter */}
      <Collapsible
        open={openSections.brands}
        onOpenChange={() => toggleSection("brands")}
        className="border border-border/60 rounded-2xl overflow-hidden bg-card/60 backdrop-blur-sm transition-all duration-200 hover:border-border"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/40 transition-colors">
          <span className="text-sm font-semibold flex items-center gap-2.5 text-foreground">
            <Tag className="w-4 h-4 text-amber-500" />
            Brand
          </span>
          {openSections.brands ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 pt-0">
          <div className="space-y-1 max-h-44 overflow-y-auto pr-1 pt-1 scrollbar-thin scrollbar-thumb-muted">
            {availableBrands.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No brands available
              </p>
            ) : (
              availableBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2.5 text-sm cursor-pointer hover:bg-muted/50 p-1.5 rounded-xl transition-colors"
                >
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                    className="border-border/80 data-[state=checked]:bg-amber-400 data-[state=checked]:text-slate-950 data-[state=checked]:border-amber-400"
                  />
                  <span className="text-xs md:text-sm text-foreground capitalize">
                    {brand}
                  </span>
                </label>
              ))
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Delivery Options Filter */}
      <Collapsible
        open={openSections.delivery}
        onOpenChange={() => toggleSection("delivery")}
        className="border border-border/60 rounded-2xl overflow-hidden bg-card/60 backdrop-blur-sm transition-all duration-200 hover:border-border"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/40 transition-colors">
          <span className="text-sm font-semibold flex items-center gap-2.5 text-foreground">
            <Truck className="w-4 h-4 text-amber-500" />
            Delivery Options
          </span>
          {openSections.delivery ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 pt-0">
          <RadioGroup
            value={deliveryOption}
            onValueChange={setDeliveryOption}
            className="space-y-1 pt-1"
          >
            {["All", "Standard", "Pick Up", "Express"].map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2.5 text-sm cursor-pointer hover:bg-muted/50 p-1.5 rounded-xl transition-colors"
              >
                <RadioGroupItem
                  value={opt}
                  id={`del-${opt}`}
                  className="border-border/80 text-amber-500 focus:ring-amber-500"
                />
                <span className="flex items-center gap-2 text-xs md:text-sm text-foreground">
                  {opt === "Standard" && (
                    <Truck className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                  {opt === "Pick Up" && (
                    <Package className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                  {opt}
                </span>
              </label>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2">
        <Button
          variant="outline"
          onClick={onClearAll}
          className="flex-1 rounded-xl border-border/80 hover:border-red-400/50 hover:bg-red-500/10 hover:text-red-500 transition-all text-xs font-medium h-10"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          Reset All
        </Button>
      </div>
    </div>
  );
}