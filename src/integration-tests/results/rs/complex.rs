extern crate serde_json;

pub type Skip = bool;
/// Bip
///
/// abc 123
///
/// # Default
///
/// 123
///
/// # Example
///
/// `123`
///
/// # Example
///
/// `456`
///
/// # Example
///
/// `789`
///
pub type Bip = i64;
pub type Bipper = f64;
pub type Bop = f64;
#[derive(Serialize, Deserialize)]
pub enum Bopper {
    #[serde(rename = asd)]
    Asd,
    #[serde(rename = bca)]
    Bca,
}
pub type Skibb = serde_json::Value;
pub type Skibbidippy = Vec<Bop>;
pub type Bopskippity = String;
pub type Floopdidoop = HashMap<String, Option<serde_json::Value>>;
#[derive(Serialize, Deserialize)]
pub struct Skiperydippery {
    pub(crate) fooberdoober: Option<Bop>,
    pub(crate) gibbledybits: Option<Bopskippity>,
}
pub type Doppler = HashMap<String, Option<serde_json::Value>>;
pub type Gorbelchov = f64;
#[derive(Serialize, Deserialize)]
pub struct Bonkiedonky {
    pub(crate) shopper: Option<Doppler>,
    pub(crate) badmirputin: Option<Gorbelchov>,
}
pub type Zip = i64;
#[derive(Serialize, Deserialize)]
pub enum Skorpionuts {
    Skip,
    Zip
}
#[derive(Serialize, Deserialize)]
pub enum Chikypoops {
    Skip,
    Zip
}
#[derive(Serialize, Deserialize)]
pub struct BippyskippyBoppy {
    pub(crate) bool: Option<Skip>,
    pub(crate) int: Option<Bip>,
    pub(crate) number: Option<Bipper>,
    pub(crate) string: Option<Bop>,
    pub(crate) stringEnum: Option<Bopper>,
    pub(crate) orderedArray: Option<Skibbidippy>,
    pub(crate) unorderedArray: Option<Skibbidippy>,
    pub(crate) object: Option<Floopdidoop>,
    pub(crate) allOf: Option<Floopdidoop>,
    pub(crate) anyOf: Option<Skorpionuts>,
    pub(crate) oneOf: Option<Chikypoops>,
}
